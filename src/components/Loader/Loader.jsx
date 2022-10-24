import { Hearts } from 'react-loader-spinner';
import { HeartContainer } from './Loader.styled';

export const Loader = () => {
  return (
    <HeartContainer>
      <Hearts
        height="80"
        width="80"
        color="#3f51b5"
        ariaLabel="hearts-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </HeartContainer>
  );
};
