import React from "react";
import { Link } from "react-router-dom";

const RiderOrLearnerSelection = () => {
  return (
    <section className="dark:bg-accent py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Job poster or seeker content Start */}
        <div className="flex flex-row">
          <div className="w-1/2 flex flex-col items-center justify-center bg-gray-100">
            <p className="text-lg font-medium mb-4">
              <Link
                to="/rider-registration"
                className="text-black hover:bg-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Register as Rider
              </Link>
            </p>
          </div>
          <div className="w-1/2 flex flex-col items-center justify-center bg-gray-200">
            <p className="text-lg font-medium mb-4">
              <Link
                to="/learner-registration"
                className="text-black hover:bg-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Register as Learner
              </Link>
            </p>
          </div>
        </div>
        {/* Job poster or seeker content End */}
      </div>
    </section>
  );
};

export default RiderOrLearnerSelection;
