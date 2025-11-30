import React from "react";

import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Rider = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { currentUser } = useAuth();

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const riderRegion = useWatch({ control, name: "riderRegion" });

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter(
      (dis) => dis.region === region
    );
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleRider = (data) => {
    console.log(data);
    axiosSecure.post("/rider", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title:
            "Your Application Has Been Submitted. We will reach to you in 45 days",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-primary text-4xl">Be a Rider</h2>
      <form onSubmit={handleSubmit(handleRider)} className="mt-12 p-4 bg-white">
        {/* document or parcel type */}
        <div>
          <p className="font-bold">Enter Rider Personal Detail</p>
          <hr className="my-3  bg-gray-200/80 h-0.5" />
        </div>
        {/* parcel info name, weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          <fieldset className="fieldset">
            {/* Rider Name */}
            <label className="label">Rider Name</label>
            <input
              type="text"
              defaultValue={currentUser.displayName}
              {...register("riderName", { required: true })}
              className="input w-full"
              placeholder="rider Name"
            />
            {/* Driving License Number */}
            <label className="label">Driving License Number</label>
            <input
              type="number"
              {...register("drivingLicenseNum", { required: true })}
              className="input w-full"
              placeholder="rider Driving License Number"
            />
            {/* rider Address */}
            <label className="label">Rider Address</label>
            <input
              type="text"
              {...register("riderAddress", { required: true })}
              className="input w-full"
              placeholder="rider Address"
            />
            {/* rider Email */}
            <label className="label">Rider Email</label>
            <input
              type="email"
              defaultValue={currentUser.email}
              {...register("riderEmail")}
              className="input w-full"
              placeholder="rider Email"
            />
            {/* rider Phone Number */}
            <label className="label">Rider Phone Number</label>
            <input
              type="text"
              {...register("riderPhone", { required: true })}
              className="input w-full"
              placeholder="riderPhone"
            />
            {/* rider regions */}
            <label className="label">Rider Regions</label>
            <select
              {...register("riderRegion")}
              defaultValue="Pick a region"
              className="select w-full"
            >
              <option disabled={true}>Pick a Region</option>
              {regions.map((r, i) => (
                <option value={r} key={i}>
                  {r}
                </option>
              ))}
            </select>
            {/* rider District */}
            <label className="label">Rider District</label>
            <select
              {...register("riderDistrict", { required: true })}
              defaultValue="Pick a district"
              className="select w-full"
            >
              <option disabled={true}>Pick a district</option>
              {districtsByRegion(riderRegion).map((r, i) => (
                <option value={r} key={i}>
                  {r}
                </option>
              ))}
            </select>
            {/* NID No */}
            <label className="label">Rider NID No</label>
            <input
              type="number"
              {...register("nidNo", { required: true })}
              className="input w-full"
              placeholder="NID NO"
            />
          </fieldset>
        </div>

        <input
          className="btn btn-primary mt-3 text-white"
          type="submit"
          value="Apply as a Rider"
        />
      </form>
    </div>
  );
};

export default Rider;
