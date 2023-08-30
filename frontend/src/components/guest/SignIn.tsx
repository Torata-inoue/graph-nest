import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {SignInResponse} from "../../types/signInResponse.ts";
import {SIGN_IN} from "../../mutations/authMutations.ts";
import {useNavigate} from "react-router-dom";
import {useSignIn} from "../../hooks/guest/useSignIn.ts";
import {useMutationApi} from "../../hooks/useMutationApi.ts";

const theme = createTheme();

const SignIn: React.FC = () => {
  const {register, formState: {errors}, handleSubmit} = useSignIn();
  const signIn = useMutationApi<SignInResponse>(SIGN_IN);
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const result = await signIn({signInInput: data});
    if (result === undefined) {
      return;
    }
    if (result.data) {
      localStorage.setItem('token', result.data.signIn.accessToken);
    }
    localStorage.getItem('token') && navigate('/');
  })

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              {...register('email', {
                required: true
              })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="password"
              label="Password"
              {...register('password', {
                required: true
              })}
            />
            {(errors.email || errors.password) && <Typography color="red">メールアドレスまたはパスワードを確認してください</Typography> }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              サインイン
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  新規作成はこちらから
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
