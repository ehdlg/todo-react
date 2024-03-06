import '../styles/Error.css';

export function Error({ msg }: { msg: string }) {
  return (
    <div className='error-wrapper'>
      <h3 className='error-title'>
        There was an error trying to load the todos:
      </h3>
      <p className='error-message'>{msg}</p>
    </div>
  );
}

export default Error;
