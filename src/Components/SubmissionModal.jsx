import React from "react";

const SubmissionModal = ({ onSubmit, register }) => {
  return (
    <dialog id="submit_modal" className="modal">
      <div className="modal-box w-11/12 max-w-3xl">
        <h3 className="font-bold text-lg mb-4">Submit Your Entry</h3>

        <form onSubmit={onSubmit} className="space-y-4">

          <textarea
            {...register("submissionText")}
            className="textarea textarea-bordered w-full"
            placeholder="Write your submission or paste your artwork link"
            required
          ></textarea>

          <button className="btn btn-primary w-full">Submit</button>
        </form>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default SubmissionModal;
