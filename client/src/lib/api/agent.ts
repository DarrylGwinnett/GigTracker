import axios from 'axios';
import { store } from '../stores/store';
import { toast } from 'react-toastify';
import { router } from '../../app/router/Routes';
const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};
const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

agent.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    store.uiStore.isIdle();
    return response;
  },
  async (error) => {
    await sleep(1000);
    store.uiStore.isIdle();
    const { data, status } = error.response;
    switch (status) {
      case 400:
        if (data?.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        } else {
          toast.error('Bad Request');
        }
        break;
      case 401:
        toast.error('Unauthorised');
        break;
      case 404:
        router.navigate('/notFound');
        break;
      case 500:
        router.navigate('/serverError', { state: { error: data } });
        break;
      default:
        toast.error('Something went wrong - check the terminal for more info!');
        break;
    }
    return Promise.reject(data);
  }
);

agent.interceptors.request.use((config) => {
  store.uiStore.isBusy();
  return config;
});

export default agent;
