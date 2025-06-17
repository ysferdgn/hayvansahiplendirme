import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { petService } from '../services/api';

function Profile() {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);

  useEffect(() => {
    fetchUserPets();
  }, []);

  const fetchUserPets = async () => {
    try {
      setLoading(true);
      const data = await petService.getUserPets();
      setPets(data);
    } catch (err) {
      setError('İlanlarınız yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/pets/edit/${id}`);
  };

  const handleDeleteClick = (pet) => {
    setPetToDelete(pet);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await petService.deletePet(petToDelete._id);
      setPets(pets.filter(pet => pet._id !== petToDelete._id));
      setDeleteDialogOpen(false);
      setPetToDelete(null);
    } catch (err) {
      setError('İlan silinirken bir hata oluştu');
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
    <Box sx={{ pt: 10, pb: 4 }}>
      <Container>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            İlanlarım
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/pets/new')}
          >
            Yeni İlan Ekle
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {pets.length === 0 ? (
          <Alert severity="info">
            Henüz ilanınız bulunmuyor. Yeni bir ilan eklemek için "Yeni İlan Ekle" butonuna tıklayın.
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {pets.map((pet) => (
              <Grid item xs={12} sm={6} md={4} key={pet._id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={pet.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                    alt={pet.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {pet.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                      {pet.type} • {pet.breed}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOnIcon color="error" sx={{ mr: 0.5 }} />
                      <Typography variant="body1" color="error" sx={{ fontWeight: 'medium' }}>
                        {pet.location}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {pet.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(pet._id)}
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteClick(pet)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>İlanı Sil</DialogTitle>
          <DialogContent>
            <Typography>
              "{petToDelete?.name}" isimli ilanı silmek istediğinizden emin misiniz?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>İptal</Button>
            <Button onClick={handleDeleteConfirm} color="error" variant="contained">
              Sil
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

export default Profile; 