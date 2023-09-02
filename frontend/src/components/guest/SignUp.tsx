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
import {User} from "../../types/user.ts";
import {SIGN_IN, SIGN_UP} from "../../mutations/authMutations.ts";
import {SignInResponse} from "../../types/signInResponse.ts";
import {useNavigate} from "react-router-dom";
import {useSignUp} from "../../hooks/guest/useSignUp.ts";
import {useMutationApi} from "../../hooks/useMutationApi.ts";

const theme = createTheme();

const SignUp: React.FC = () => {
  const {register, formState: {errors}, handleSubmit} = useSignUp();
  const signUp = useMutationApi<{createUser: User}>(SIGN_UP);
  const signIn = useMutationApi<SignInResponse>(SIGN_IN);
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const result = await signUp({createUserInput: data});
    if (result === undefined) {
      return;
    }
    if (result.data?.createUser) {
      const signInInput = {email: data.email, password: data.password};
      const result = await signIn({signInInput});
      if (result === undefined) {
        return;
      }
      if (result.data) {
        localStorage.setItem('token', result.data.signIn.accessToken);
      }
      localStorage.getItem('token') && navigate('/');
    }
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  required
                  fullWidth
                  label="Name"
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                  {...register('name', {
                    required: {value: true, message: '名前を入力してください'}
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                  {...register('email', {
                    required: {value: true, message: 'メールアドレスを入力してください'}
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                  {...register('password', {
                    required: {value: true, message: 'パスワードを入力してください'}
                  })}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              新規作成
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  サインインはこちらから
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
