function UnderReviewBanner() {
  return (
    <div className="p-6 bg-functional-warning-50 rounded-xl">
      <p className="text-lg text-gray-800 font-semibold leading-6">
        Your account is being reviewed.
      </p>
      <p className="text-base text-gray-800 leading-5.5 font-normal">
        Once your account is verified, you will be able to accept and respond to
        design critique requests.
      </p>
    </div>
  );
}

export default UnderReviewBanner;
