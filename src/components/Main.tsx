import { PropsWithChildren } from 'react';

function Main({ children }: PropsWithChildren) {
  return <main className='flex'>{children}</main>;
}

export default Main;
