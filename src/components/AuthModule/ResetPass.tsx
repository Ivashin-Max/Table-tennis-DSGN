import ResetPassForm from './Authorization/ResetPassForm';

const ResetPass = () => {

  return (
    <>
      <div className="center">
        <ResetPassForm sendEmail={false} closeFormModal={() => null} changeForm={() => null} />
      </div>
    </>
  )
}

export default ResetPass