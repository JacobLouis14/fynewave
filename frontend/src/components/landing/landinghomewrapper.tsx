"use client";
import { useSelector } from "react-redux";
import { isScrolledToHomeInLandingPageState } from "@/lib/states/features/appUiSlice";
import Appbar from "../common/Appbar";

interface Props {
  children: React.ReactNode;
}

const LandingHomeWrapper = ({ children }: Props) => {
  const isInHome = useSelector(isScrolledToHomeInLandingPageState);

  return (
    <>
      {isInHome && <Appbar />}
      {children}
    </>
  );
};

export default LandingHomeWrapper;
