const Landing = () => {

const handleSubmit = () =>{
    window.location.href = "/home"
}

  return (
    <div className="LandingPage-Container">
        <p className="text-3xl lg:text-7xl leading-snug lg:leading-snug font-bold loading-text">
        <p>Enrich your</p> 
        <p><span className="text-blue-500">Email </span>writing</p> 
        <p>experience with</p> 
        <p className="text-blue-500">Content.io</p>
        </p>
        <button onClick={handleSubmit} className="btn btn-outline btn-success mt-10"><h1 className="text-2xl">
           Get Started
        </h1></button>
    </div>
  )
}

export default Landing