import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Paper, Typography } from '@mui/material';
import { LockOpen } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router';
import TextInput from '../../app/layout/shared/TextInput';
import { useAccount } from '../../lib/hooks/useAccount';
import type { LoginSchema } from '../../lib/schemas/loginSchema';
import { loginSchema } from '../../lib/schemas/loginSchema';

export default function LoginForm() {
  const { loginUser } = useAccount();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<LoginSchema>({
    mode: 'onTouched',
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    await loginUser.mutateAsync(data, {
      onSuccess: () => {
        console.log('starting nav');
        navigate('/gigs');
        console.log('finishing nav');
      },
    });
    console.log('finished on success')
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 3,
        gap: 3,
        maxWidth: 'md',
        mx: 'auto',
        borderRadius: 3,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={3}
        color="secondary.main"
      >
        <LockOpen fontSize="large" />
        <Typography variant="h4">Sign in</Typography>
      </Box>
      <TextInput label="Email" control={control} name="email" />
      <TextInput
        label="Password"
        type="password"
        control={control}
        name="password"
      />
      <Button
        type="submit"
        disabled={!isValid || isSubmitting}
        variant="contained"
        size="large"
      >
        Login
      </Button>
      <Typography sx={{ textAlign: 'center' }}>
        Don't have an account?
        <Typography
          sx={{ ml: 2 }}
          component={Link}
          to="/register"
          color="primary"
        >
          Sign up
        </Typography>
      </Typography>
    </Paper>
  );
}
