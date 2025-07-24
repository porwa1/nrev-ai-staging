import svgPaths from "./svg-by0sc1nl7p";
import imgImage390 from "figma:asset/80bc749473626a69295572ce507c85264f52a0be.png";

function UnstyledButton() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start overflow-clip px-6 py-3 relative shrink-0"
      data-name="UnstyledButton"
    >
      <div className="font-['Mulish:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[#ffffff] text-[18px] text-left text-nowrap tracking-[-0.36px]">
        <p className="adjustLetterSpacing block leading-[22px] whitespace-pre">
          Get Early Access
        </p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div
      className="absolute bg-[#1e1e1e] bottom-0 box-border content-stretch flex flex-col items-center justify-center left-0 overflow-clip p-[4px] right-[61.167%] rounded-xl top-[83.333%]"
      data-name="Button"
    >
      <UnstyledButton />
    </div>
  );
}

function LabelWrapper() {
  return (
    <div className="relative shrink-0 w-full" data-name="labelWrapper">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-start pb-3 pl-0 pr-2 pt-0 relative w-full">
          <div
            className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[14px] text-left text-nowrap text-zinc-800"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            <p className="block leading-[16px] whitespace-pre">
              Please enter your work email
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaceholderWrapper() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="placeholderWrapper"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[16px] text-left text-zinc-500 w-[276px]">
        <p className="block leading-[24px]">&nbsp;</p>
      </div>
    </div>
  );
}

function Wrapper() {
  return (
    <div
      className="basis-0 grow h-full min-h-px min-w-px relative shrink-0"
      data-name="Wrapper"
    >
      <div className="flex flex-col justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-center pb-0.5 pt-0 px-1.5 relative size-full">
          <PlaceholderWrapper />
        </div>
      </div>
    </div>
  );
}

function ContentWrapper1() {
  return (
    <div
      className="basis-0 grow min-h-8 min-w-px relative rounded-lg shrink-0 w-full"
      data-name="contentWrapper"
    >
      <div className="absolute border-2 border-solid border-zinc-200 inset-[-2px] pointer-events-none rounded-[10px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="min-h-inherit relative size-full">
        <div className="box-border content-stretch flex flex-row items-start justify-start min-h-inherit px-1.5 py-2 relative size-full">
          <Wrapper />
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-[74px] items-start justify-start min-w-[116px] p-0 relative shrink-0 w-full"
      data-name="Input"
    >
      <LabelWrapper />
      <ContentWrapper1 />
    </div>
  );
}

function Frame1000002823() {
  return (
    <div className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-[497px]">
      <Input />
    </div>
  );
}

function Component5() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0"
      data-name="Component 5"
    >
      <Frame1000002823 />
    </div>
  );
}

function Frame1000003473() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
      <Component5 />
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic opacity-0 relative shrink-0 text-[12px] text-left text-zinc-500 tracking-[0.4px] w-[276px]">
        <p className="adjustLetterSpacing block leading-[14px]">
          Comma separated domains
        </p>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col items-start justify-start left-1/2 min-w-[116px] p-0 translate-x-[-50%] translate-y-[-50%]"
      data-name="Input"
      style={{ top: "calc(50% + 52px)" }}
    >
      <Frame1000003473 />
    </div>
  );
}

function Frame1000003757() {
  return (
    <div className="h-[324px] relative shrink-0 w-[497px]">
      <div className="absolute bottom-[86.111%] flex flex-col font-['Mulish:Bold',_sans-serif] font-bold justify-center leading-[0] left-[0.805%] right-0 text-[#000000] text-[36px] text-left text-nowrap top-0">
        <p className="block leading-[normal] whitespace-pre">
          Reserve Your Seat at Launch
        </p>
      </div>
      <div
        className="absolute bottom-[66.049%] font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] left-[0.805%] right-[12.676%] text-[#000000] text-[20px] text-left top-[17.284%] tracking-[0.15px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[normal]">
          Join our private beta and be among the first to automate RevOps
          workflows.
        </p>
      </div>
      <Button />
      <Input1 />
    </div>
  );
}

function Frame1000003922() {
  return (
    <div className="absolute box-border content-stretch flex flex-row gap-12 items-center justify-start left-0 p-0 top-0">
      <div
        className="bg-center bg-cover bg-no-repeat h-[462px] shrink-0 w-[372px]"
        data-name="image 390"
        style={{ backgroundImage: `url('${imgImage390}')` }}
      />
      <Frame1000003757 />
    </div>
  );
}

function Close() {
  return (
    <div className="absolute left-[1004px] size-6 top-6" data-name="Close">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Close">
          <path
            d={svgPaths.p3fd9e500}
            fill="var(--fill-0, #4C4E64)"
            fillOpacity="0.54"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

export default function BreakpointSm() {
  return (
    <div
      className="bg-[#ffffff] overflow-clip relative rounded-[6.85453px] size-full"
      data-name="Breakpoint/sm"
    >
      <Frame1000003922 />
      <Close />
    </div>
  );
}