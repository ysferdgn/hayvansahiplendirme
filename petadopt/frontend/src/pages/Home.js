import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { petService } from '../services/api';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function Home() {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const data = await petService.getAllPets();
      setPets(data);
    } catch (err) {
      setError('Evcil hayvanlar yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ pt: 8, pb: 4 }}>
      <Container maxWidth="lg">
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={2}>
          {pets.map((pet) => (
            <Grid key={pet._id} sx={{ width: { xs: '100%', sm: '50%', md: '25%' } }}>
              <Card
                sx={{
                  height: '400px',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  },
                }}
                onClick={() => navigate(`/pets/${pet._id}`)}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: '180px',
                    width: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    aspectRatio: '16/9',
                  }}
                  image={pet.image || 'https://source.unsplash.com/random/600x400/?pet'}
                  alt={pet.name}
                />
                <CardContent sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  p: 1.5,
                  flexGrow: 1,
                }}>
                  <Box>
                    <Typography gutterBottom variant="h5" component="h2" noWrap sx={{ fontWeight: 'bold' }}>
                      {pet.name}
                    </Typography>
                    <Typography variant="body2" noWrap>
                      {pet.type} • {pet.breed}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mt: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {pet.description}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      Yaş: {pet.age}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <LocationOnIcon sx={{ color: 'red', fontSize: '1.2rem' }} />
                      <Typography variant="h6" color="error" noWrap>
                        {pet.location}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Home; 