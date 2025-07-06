import { createFileRoute, Link } from "@tanstack/react-router";
import { LuX } from "react-icons/lu";
import OnboardingSelection from "@/components/page-components/Signup/OnboardingSelection";
import SignupButton from "@/components/page-components/Signup/SignupButton";
import { isAuthenticated } from "@/helpers/auth";
import { useState } from "react";
import { UserType } from "@/enums/user";

export const Route = createFileRoute("/signup/")({
  async beforeLoad() {
    const authenticated = await isAuthenticated();
    if (authenticated) {
      throw new Error("Already authenticated, redirecting to dashboard");
    }
  },
  component: Signup
});

function Signup() {
  const [selectedType, setSelectedType] = useState<UserType.Client | UserType.Jammer | null>(null);
  return (
    <div className="min-h-screen bg-[#f7f5f0] flex flex-col">
      {/* Header */}
      <header className="w-full bg-white flex flex-row items-center justify-between px-28 py-8">
        <span className="h-[46px] w-[104px] block">
          <svg
            className="block w-full h-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 104 46"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Group">
              <g id="Group_2">
                <path d="M5.87549 20.8922V0H22.4245V3.58177H10.0841V8.38682H20.5458V11.9686H10.0841V17.3105H22.7284V20.8922H5.8663H5.87549Z" fill="#051D56" />
                <path d="M24.0176 20.8923L32.6651 1.19427e-05H37.6012L46.0369 20.8923H41.5704L34.7648 3.881H35.2345L28.4565 20.8923H24.0176ZM28.4841 15.964L29.6076 12.3822H41.4783L41.5704 15.964H28.4841Z" fill="#051D56" />
                <path d="M48.7906 20.8923V1.19427e-05H58.9391C60.1916 1.19427e-05 61.3243 0.246426 62.3466 0.73045C63.3688 1.21447 64.17 1.8921 64.7686 2.74575C65.358 3.59939 65.6619 4.57624 65.6619 5.6675C65.6619 8.29003 64.4186 10.0589 61.9414 10.9478C63.1293 10.9478 63.995 11.203 64.5291 11.7222C65.0725 12.2414 65.3396 12.9631 65.3396 13.9047V20.8923H61.1217V14.9256C61.1217 14.1687 60.9836 13.6583 60.6981 13.3855C60.4126 13.1127 59.8785 12.9807 59.0865 12.9807H52.9992V20.8923H48.7813H48.7906ZM53.0084 9.46049H57.6959C58.9484 9.46049 59.8785 9.20527 60.5047 8.68604C61.1309 8.16682 61.444 7.41879 61.444 6.45074C61.444 4.54104 60.1916 3.58179 57.6959 3.58179H53.0084V9.46049Z" fill="#051D56" />
                <path d="M70.1192 20.8923V1.19427e-05H74.337V17.3105H86.6774V20.8923H70.1284H70.1192Z" fill="#051D56" />
                <path d="M91.632 20.8923V12.5318L83.5094 1.19427e-05H88.289L93.879 8.77405L99.3769 1.19427e-05H104L95.8498 12.5318V20.8923H91.632Z" fill="#051D56" />
              </g>
              <g id="Group_3">
                <path d="M0.00921823 45.9999V42.1189H4.00603C4.71514 42.1189 5.20322 41.9869 5.47029 41.7317C5.73736 41.4765 5.8755 41.0101 5.8755 40.3324V25.1077H10.0933V41.8197C10.0933 43.0958 9.69734 44.1078 8.90535 44.8647C8.11335 45.6215 7.0543 45.9999 5.71896 45.9999H0H0.00921823Z" fill="#051D56" />
                <path d="M12.4048 45.9998L21.0523 25.1076H25.9884L34.4241 45.9998H29.9576L23.152 28.9886H23.6216L16.8436 45.9998H12.4048ZM16.8713 41.0716L17.9948 37.4898H29.8655L29.9576 41.0716H16.8713Z" fill="#051D56" />
                <path d="M37.1684 45.9998V25.1076H43.7254L49.2878 41.7052H49.1588L54.5278 25.1076H61.0572V45.9998H56.9314V29.1118L57.0604 29.1382L51.498 45.9998H46.875L41.156 29.1382L41.2849 29.1118V45.9998H37.1592H37.1684Z" fill="#051D56" />
              </g>
              <path clipRule="evenodd" d="M95.8681 40.5437V25.1077H65.3579V45.9999L71.0584 40.5437H95.8681ZM76.0504 32.6408C76.0504 33.6323 75.2092 34.4361 74.1717 34.4361C73.1341 34.4361 72.293 33.6323 72.293 32.6408C72.293 31.6493 73.1341 30.8455 74.1717 30.8455C75.2092 30.8455 76.0504 31.6493 76.0504 32.6408ZM80.6086 34.4361C81.6462 34.4361 82.4873 33.6323 82.4873 32.6408C82.4873 31.6493 81.6462 30.8455 80.6086 30.8455C79.5711 30.8455 78.73 31.6493 78.73 32.6408C78.73 33.6323 79.5711 34.4361 80.6086 34.4361ZM88.9341 32.6408C88.9341 33.6323 88.093 34.4361 87.0554 34.4361C86.0179 34.4361 85.1768 33.6323 85.1768 32.6408C85.1768 31.6493 86.0179 30.8455 87.0554 30.8455C88.093 30.8455 88.9341 31.6493 88.9341 32.6408Z" fill="#051D56" fillRule="evenodd" />
            </g>
          </svg>
        </span>
        <button
          className="flex items-center justify-center bg-[#F2F4F7] rounded-full"
          style={{ width: 48, height: 48 }}
          aria-label="Close"
          onClick={() => window.location.href = "https://www.earlyjam.com"}
        >
          <LuX className="text-[#98A2B3] w-6 h-6" />
        </button>
      </header>
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-1 w-full">
        <h2 className="font-fraunces text-[36px] leading-[44px] text-[#051D56] font-normal text-left mt-4 mb-10">
          Join as a client or designer
        </h2>
        <div className="flex flex-row gap-8 w-full max-w-4xl justify-center mb-10 flex-wrap">
          <OnboardingSelection selectedType={selectedType} setSelectedType={setSelectedType} />
        </div>
        <SignupButton selectedType={selectedType} />
        <div className="flex flex-row items-center justify-center gap-1 w-full mb-2">
          <span className="text-[#475467] text-[14px] font-gilroy font-medium">Already have an EarlyJam account?</span>
          <Link to="/login" className="text-[#628ef8] text-[14px] font-gilroy font-semibold hover:underline">Login</Link>
        </div>
      </main>
    </div>
  );
}
