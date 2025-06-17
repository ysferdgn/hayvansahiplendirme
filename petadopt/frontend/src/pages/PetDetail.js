import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { petService } from '../services/api';

function PetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [adoptDialogOpen, setAdoptDialogOpen] = useState(false);
  const [adopting, setAdopting] = useState(false);

  useEffect(() => {
    fetchPetDetails();
  }, [id]);

  const fetchPetDetails = async () => {
    try {
      const data = await petService.getPetById(id);
      setPet(data);
    } catch (err) {
      setError('Evcil hayvan bilgileri yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleAdopt = async () => {
    setAdopting(true);
    try {
      await petService.adoptPet(id);
      setAdoptDialogOpen(false);
      navigate('/pets');
    } catch (err) {
      setError('Sahiplenme işlemi sırasında bir hata oluştu');
    } finally {
      setAdopting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!pet) {
    return (
      <Container>
        <Alert severity="error">Evcil hayvan bulunamadı</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Button
        variant="outlined"
        onClick={() => navigate('/pets')}
        sx={{ mb: 4 }}
      >
        ← Evcil Hayvanlara Dön
      </Button>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <img
              src={pet.image || 'https://source.unsplash.com/random/800x600/?pet'}
              alt={pet.name}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              {pet.name}
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Chip
                label={pet.type}
                color="primary"
                sx={{ mr: 1 }}
              />
              <Chip
                label={pet.breed}
                sx={{ mr: 1 }}
              />
              <Chip
                label={pet.gender}
                sx={{ mr: 1 }}
              />
            </Box>
            <Typography variant="body1" paragraph>
              {pet.description}
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Yaş
                </Typography>
                <Typography variant="body1">{pet.age}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Boyut
                </Typography>
                <Typography variant="body1">{pet.size}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Konum
                </Typography>
                <Typography variant="body1">{pet.location}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Sağlık Durumu
                </Typography>
                <Typography variant="body1">{pet.healthStatus}</Typography>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Sahiplenme Ücreti: {pet.adoptionFee}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={() => setAdoptDialogOpen(true)}
              >
                Sahiplen
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={adoptDialogOpen} onClose={() => setAdoptDialogOpen(false)}>
        <DialogTitle>Sahiplenme Onayı</DialogTitle>
        <DialogContent>
          <Typography>
            {pet.name} isimli evcil hayvanı sahiplenmek istediğinizden emin misiniz?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAdoptDialogOpen(false)}>İptal</Button>
          <Button
            onClick={handleAdopt}
            variant="contained"
            color="primary"
            disabled={adopting}
          >
            {adopting ? 'İşlem Yapılıyor...' : 'Onayla'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default PetDetail; 