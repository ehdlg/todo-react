export function Error({ msg }: { msg: string }) {
  return (
    <div className={`error-wrapper ${msg === '' ? 'error-wrapper-hidden' : ''}`}>
      <h3 className='error-title'>There was an error</h3>
      <p className='error-message'>{msg}</p>
    </div>
  );
}

export default Error;
