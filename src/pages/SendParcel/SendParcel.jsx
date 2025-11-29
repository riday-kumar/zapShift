import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();
  const { currentUser } = useAuth();

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  // console.log(regions);

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter(
      (dis) => dis.region === region
    );
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  //  here form handler
  const handleSendParcel = (data) => {
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight <= 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }

    data.cost = cost; // we have add cost to the data from we get the user

    Swal.fire({
      title: "Are you Agree with Our Cost?",
      text: `Your total price is ${cost}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm and Continue Payment",
    }).then((result) => {
      if (result.isConfirmed) {
        // save the parcel info to the database
        axiosSecure.post("/parcels", data).then((res) => {
          console.log(`after saving parcel data`, res.data);
          if (res.data.insertedId) {
            navigate("/dashboard/my-parcels");
            Swal.fire({
              icon: "success",
              title: "Parcel has Created. Please Pay",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });

    // console.log(data);
  };

  return (
    <div>
      <h2 className="text-5xl font-bold">Send A Parcel</h2>
      <form
        onSubmit={handleSubmit(handleSendParcel)}
        className="mt-12 p-4 bg-white"
      >
        {/* document or parcel type */}
        <div>
          <p>Enter Your Parcel Detail</p>
          <hr className="my-3  bg-gray-200/80 h-0.5" />
          <label className="label mr-2">
            <input
              type="radio"
              {...register("parcelType")}
              value="document"
              className="radio"
              defaultChecked
            />
            Document
          </label>
          <label className="label">
            <input
              type="radio"
              {...register("parcelType")}
              value="non-document"
              className="radio"
            />
            Non Document
          </label>
        </div>
        {/* parcel info name, weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full"
              placeholder="Name"
            />
          </fieldset>

          <fieldset className="fieldset">
            <label className="label">Weight(KG)</label>
            <input
              type="number"
              {...register("parcelWeight")}
              className="input w-full"
              placeholder="Weight"
            />
          </fieldset>
        </div>
        {/* two column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
          {/* sender info */}
          <div>
            <h4 className="text-2xl font-semibold">Sender Details</h4>
            <fieldset className="fieldset">
              {/* sender Name */}
              <label className="label">Sender Name</label>
              <input
                type="text"
                defaultValue={currentUser.displayName}
                {...register("senderName", { required: true })}
                className="input w-full"
                placeholder="Sender Name"
              />
              {/* sender Address */}
              <label className="label">Sender Address</label>
              <input
                type="text"
                {...register("senderAddress", { required: true })}
                className="input w-full"
                placeholder="Sender Address"
              />
              {/* sender Email */}
              <label className="label">Sender Email</label>
              <input
                type="email"
                defaultValue={currentUser.email}
                {...register("senderEmail")}
                className="input w-full"
                placeholder="Sender Email"
              />
              {/* sender Phone Number */}
              <label className="label">Sender Phone Number</label>
              <input
                type="text"
                {...register("senderPhone", { required: true })}
                className="input w-full"
                placeholder="SenderPhone"
              />
              {/* sender regions */}
              <label className="label">Sender Regions</label>
              <select
                {...register("senderRegion")}
                defaultValue="Pick a region"
                className="select w-full"
              >
                <option disabled={true}>Pick a region</option>
                {regions.map((r, i) => (
                  <option value={r} key={i}>
                    {r}
                  </option>
                ))}
              </select>
              {/* sender District */}
              <label className="label">Sender District</label>
              <select
                {...register("senderDistrict", { required: true })}
                defaultValue="Pick a district"
                className="select w-full"
              >
                <option disabled={true}>Pick a district</option>
                {districtsByRegion(senderRegion).map((r, i) => (
                  <option value={r} key={i}>
                    {r}
                  </option>
                ))}
              </select>
              {/* sender Instruction */}
              <label className="label">Pickup Instruction</label>
              <textarea
                className="textarea w-full"
                {...register("pickUpInstruction")}
                placeholder="Pickup Instruction"
              ></textarea>
            </fieldset>
          </div>
          {/* receiver info */}
          <div>
            <h4 className="text-2xl font-semibold">Receiver Details</h4>
            <fieldset className="fieldset">
              {/* Receiver Name */}
              <label className="label">Receiver Name</label>
              <input
                type="text"
                {...register("receiverName", { required: true })}
                className="input w-full"
                placeholder="Receiver Name"
              />
              {/* Receiver Address */}
              <label className="label">Receiver Address</label>
              <input
                type="text"
                {...register("receiverAddress", { required: true })}
                className="input w-full"
                placeholder="Receiver Address"
              />
              {/* Receiver Email */}
              <label className="label">Receiver Email</label>
              <input
                type="email"
                {...register("receiverEmail")}
                className="input w-full"
                placeholder="Receiver Email"
              />
              {/* Receiver Phone Number */}
              <label className="label">Receiver Phone Number</label>
              <input
                type="text"
                {...register("receiverPhone", { required: true })}
                className="input w-full"
                placeholder="ReceiverPhone"
              />
              {/* Receiver Region */}
              <label className="label">Receiver Region</label>
              <select
                {...register("receiverRegion")}
                defaultValue="Pick a region"
                className="select w-full"
              >
                <option disabled={true}>Pick a region</option>
                {regions.map((r, i) => (
                  <option value={r} key={i}>
                    {r}
                  </option>
                ))}
              </select>
              {/* Receiver District */}
              <label className="label">Receiver District</label>
              <select
                {...register("receiverDistrict", { required: true })}
                defaultValue="Pick a district"
                className="select w-full"
              >
                <option disabled={true}>Pick a district</option>
                {districtsByRegion(receiverRegion).map((r, i) => (
                  <option value={r} key={i}>
                    {r}
                  </option>
                ))}
              </select>
              {/* Delivery Instruction */}
              <label className="label">Delivery Instruction</label>
              <textarea
                className="textarea w-full"
                {...register("deliveryInstruction")}
                placeholder="Delivery Instruction"
              ></textarea>
            </fieldset>
          </div>
        </div>
        <input
          className="btn btn-primary mt-3 text-white"
          type="submit"
          value="Send Parcel"
        />
      </form>
    </div>
  );
};

export default SendParcel;
