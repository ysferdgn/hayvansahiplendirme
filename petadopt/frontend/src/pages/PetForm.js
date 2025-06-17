import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { petService } from '../services/api';

// Hayvan türlerine göre ırk seçenekleri
const breedOptions = {
  'Kedi': [
    'British Shorthair',
    'Scottish Fold',
    'İran Kedisi',
    'Van Kedisi',
    'Siyam Kedisi',
    'Maine Coon',
    'Ankara Kedisi',
    'Bengal',
    'Norveç Orman Kedisi',
    'Sphynx',
    'American Shorthair',
    'Exotic Shorthair',
    'Russian Blue',
    'Somali Kedisi',
    'Ragdoll'
  ],
  'Köpek': [
    'Alman Çoban Köpeği',
    'Golden Retriever',
    'Labrador Retriever',
    'Rottweiler',
    'Bulldog',
    'Doberman',
    'Pomeranian',
    'Pug',
    'Beagle',
    'Cocker Spaniel',
    'Chihuahua',
    'Husky',
    'Shih Tzu',
    'Maltese',
    'Boxer'
  ],
  'Kuş': [
    'Muhabbet Kuşu (Budgie)',
    'Kanarya',
    'Sultan Papağanı (Cockatiel)',
    'Cennet Papağanı (Lovebird)',
    'Jako Papağanı (African Grey)',
    'Amazon Papağanı',
    'Ara Papağanı (Macaw)',
    'Zebra İspinozu',
    'Serçe',
    'Gül (Rosella) Papağanı',
    'Lori Papağanı',
    'Hint Bülbülü',
    'Saka Kuşu',
    'Kardinal',
    'İskete Kuşu'
  ],
  'Diğer': []
};

function PetForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    breed: '',
    age: '',
    location: '',
    description: '',
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (isEditMode) {
      fetchPetDetails();
    }
  }, [id]);

  const fetchPetDetails = async () => {
    try {
      setLoading(true);
      const pet = await petService.getPetById(id);
      setFormData({
        name: pet.name || '',
        type: pet.type || '',
        breed: pet.breed || '',
        age: pet.age || '',
        location: pet.location || '',
        description: pet.description || '',
        image: null,
      });
      setImagePreview(pet.image || '');
    } catch (err) {
      setError('İlan detayları yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files[0]) {
      setFormData(prev => ({ ...prev, image: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else if (name === 'type') {
      // Tür değiştiğinde ırk seçimini sıfırla
      setFormData(prev => ({ ...prev, [name]: value, breed: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isEditMode) {
        await petService.updatePet(id, formData);
      } else {
        await petService.createPet(formData);
      }
      navigate('/profile');
    } catch (err) {
      setError(isEditMode ? 'İlan güncellenirken bir hata oluştu' : 'İlan oluşturulurken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ pt: 10, pb: 4 }}>
      <Container maxWidth="sm">
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            {isEditMode ? 'İlanı Düzenle' : 'Yeni İlan Ekle'}
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="İsim"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            select
            label="Tür"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            margin="normal"
          >
            <MenuItem value="Kedi">Kedi</MenuItem>
            <MenuItem value="Köpek">Köpek</MenuItem>
            <MenuItem value="Kuş">Kuş</MenuItem>
            <MenuItem value="Diğer">Diğer</MenuItem>
          </TextField>

          <TextField
            fullWidth
            select
            label="Irk"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            required
            margin="normal"
            disabled={!formData.type || formData.type === 'Diğer'}
          >
            {formData.type && formData.type !== 'Diğer' ? (
              breedOptions[formData.type].map((breed) => (
                <MenuItem key={breed} value={breed}>
                  {breed}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">Önce tür seçin</MenuItem>
            )}
          </TextField>

          <TextField
            fullWidth
            label="Yaş"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            label="Konum"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            label="Açıklama"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            multiline
            rows={4}
            margin="normal"
          />

          <Box sx={{ mt: 2, mb: 2 }}>
            <input
              accept="image/*"
              type="file"
              id="image-upload"
              name="image"
              onChange={handleChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="image-upload">
              <Button
                variant="outlined"
                component="span"
                fullWidth
              >
                {isEditMode ? 'Fotoğrafı Değiştir' : 'Fotoğraf Yükle'}
              </Button>
            </label>
          </Box>

          {imagePreview && (
            <Box sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
            </Box>
          )}

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/profile')}
              fullWidth
            >
              İptal
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : (isEditMode ? 'Güncelle' : 'Oluştur')}
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
}

export default PetForm; 