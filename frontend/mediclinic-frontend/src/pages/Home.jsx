import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>

      {/* HERO */}
      <section className="hero container">
        <h1>
          Smart Healthcare <br />
          <span>At Your Fingertips</span>
        </h1>

        <p>
          Book appointments, manage prescriptions, and connect with
          trusted doctors — all in one platform.
        </p>

        <div className="hero-buttons">
          <button className="primary">Find Doctors</button>
          <button className="secondary">Learn More</button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features container">
        <div className="feature-card">
          <h3>Find Doctors</h3>
          <p>Search and connect with verified specialists instantly.</p>
        </div>

        <div className="feature-card">
          <h3>Book Appointments</h3>
          <p>Schedule visits easily with real-time availability.</p>
        </div>

        <div className="feature-card">
          <h3>Medical Records</h3>
          <p>Access your prescriptions and history anytime.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Take control of your health today</h2>
        <button>Get Started</button>
      </section>
    </>
  );
};

export default Home;