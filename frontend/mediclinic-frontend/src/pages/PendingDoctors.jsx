import React,
{
  useEffect,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
  getPendingDoctors,

} from "../features/admin/adminSlice";



const PendingDoctors =
  () => {

    const dispatch =
      useDispatch();
const navigate = useNavigate();
    const {
      pendingDoctors,
    } = useSelector(
      (state) =>
        state.admin
    );

    useEffect(() => {

      dispatch(
        getPendingDoctors()
      );

    }, [dispatch]);

 
    return (
      <div className="pending-page">

       

        <div className="pending-grid">

          {pendingDoctors.map(
            (doctor) => (

              <div
                key={
                  doctor._id
                }
                className="pending-card"
              >

                <h2>
                  Dr. {
                    doctor.name
                  }
                </h2>

                <p>
                  {
                    doctor.email
                  }
                </p>

                <p>
                  {
                    doctor.specialization
                  }
                </p>

                <div className="pending-actions">

                 <button
  className="view-btn"
  onClick={() =>
    navigate(
      `/admin/doctors/${doctor._id}`
    )
  }
>
  View Profile
</button>

                </div>

              </div>
            )
          )}

        </div>

      </div>
    );
};

export default
  PendingDoctors;