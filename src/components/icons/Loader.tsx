import type { SVGProps } from "react";

export function Loader(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      {/* Icon from BoxIcons by Atisa - https://creativecommons.org/licenses/by/4.0/ */}
      <path
        fill="currentColor"
        d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8s3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10"
      />
    </svg>
  );
}
