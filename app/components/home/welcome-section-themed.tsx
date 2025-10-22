import { SectionCard as SectionCardThemed } from "../common/section-card";
import { WelcomeCardThemed, WelcomeCardThemedProps } from "./welcome-card-themed";

export function WelcomeSectionThemed(props: WelcomeCardThemedProps) {
  // Wrap both themes to keep structure identical
  return (
    <SectionCardThemed>
      <WelcomeCardThemed {...props} />
    </SectionCardThemed>
  );
}

export default WelcomeSectionThemed;
