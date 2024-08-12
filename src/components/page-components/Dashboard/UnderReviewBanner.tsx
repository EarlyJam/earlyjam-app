function UnderReviewBanner() {
  return (
    <div className="rounded-xl bg-functional-warning-50 p-6">
      <p className="text-lg font-semibold leading-6 text-gray-800">
        Your account is being reviewed.
      </p>
      <p className="text-base font-normal leading-5.5 text-gray-800">
        Once your account is verified, you will be able to accept and respond to
        design critique requests.
      </p>
    </div>
  );
}

export default UnderReviewBanner;
