import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(formData);
      navigate('/'); // Başarılı girişten sonra ana sayfaya yönlendir
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Giriş yapılırken bir hata oluştu. Lütfen bilgilerinizi kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ pt: 10, pb: 4 }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Giriş Yap
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                required
                label="E-posta"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                required
                label="Şifre"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
              </Button>

              <Button
                variant="text"
                onClick={() => navigate('/register')}
                fullWidth
              >
                Hesabınız yok mu? Kayıt olun
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login; 