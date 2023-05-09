import {Box, Button, Container, Slider} from '@mui/material';
import useForm from '../hooks/FormHooks';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {appId} from '../utils/variables';
import {useMedia, useTag} from '../hooks/ApiHooks';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(
    'src/images/png-transparent-upload-files-icon-thumbnail.png'
  );
  // 'https://placehold.co/600x400?text=Choose-media'
  const {postMedia} = useMedia();
  const {postTag} = useTag();
  const navigate = useNavigate();

  const initValues = {
    title: '',
    description: '',
  };

  const filterInitValues = {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    sepia: 0,
  };

  const doUpload = async () => {
    try {
      const data = new FormData();
      data.append('title', inputs.title);
      const allData = {
        desc: inputs.description,
        filters: filterInputs,
      };
      data.append('description', JSON.stringify(allData));
      data.append('file', file);
      const userToken = localStorage.getItem('userToken');
      const uploadResult = await postMedia(data, userToken);
      const tagResult = await postTag(
        {
          file_id: uploadResult.file_id,
          tag: appId,
        },
        userToken
      );
      console.log('doUpload', tagResult);
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleFileChange = (event) => {
    event.persist();
    setFile(event.target.files[0]);
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setSelectedImage(reader.result);
    });
    reader.readAsDataURL(event.target.files[0]);
  };

  const {inputs, handleSubmit, handleInputChange} = useForm(
    doUpload,
    initValues
  );

  const {inputs: filterInputs, handleInputChange: handleFilterChange} = useForm(
    null,
    filterInitValues
  );

  console.log('Upload', file);

  return (
    <Container
      sx={{
        width: '800px',
        display: 'flax',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box sx={{width: '800px', alignItems: 'center'}}>
        <img
          src={selectedImage}
          alt="preview"
          style={{
            width: '100%',
            height: 400,
            objectFit: 'contain',
            filter: `
          brightness(${filterInputs.brightness}%)
          contrast(${filterInputs.contrast}%)
          saturate(${filterInputs.saturation}%)
          sepia(${filterInputs.sepia}%)
          `,
          }}
        />
        <form onSubmit={handleSubmit}>
          <Box>
            {' '}
            <input
              onChange={handleInputChange}
              type="text"
              name="title"
              value={inputs.title}
            ></input>
            <input
              onChange={handleInputChange}
              name="description"
              value={inputs.description}
            ></input>
            <input
              onChange={handleFileChange}
              type="file"
              name="file"
              accept="image/*,video/*,audio/*"
            ></input>
            <Button type="submit" variant="contained">
              Upload
            </Button>
          </Box>
        </form>

        <Slider
          name="brightness"
          min={0}
          max={200}
          step={1}
          valueLabelDisplay="auto"
          onChange={handleFilterChange}
          value={filterInputs.brightness}
        />
        <Slider
          name="contrast"
          min={0}
          max={200}
          step={1}
          valueLabelDisplay="auto"
          onChange={handleFilterChange}
          value={filterInputs.contrast}
        />
        <Slider
          name="saturation"
          min={0}
          max={200}
          step={1}
          valueLabelDisplay="auto"
          onChange={handleFilterChange}
          value={filterInputs.saturation}
        />
        <Slider
          name="sepia"
          min={0}
          max={100}
          step={1}
          valueLabelDisplay="auto"
          onChange={handleFilterChange}
          value={filterInputs.sepia}
        />
      </Box>
    </Container>
  );
};

export default Upload;
