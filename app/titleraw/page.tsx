import RawtextEditor from "@/components/pages/rawtextEditor";
import { domain } from "@/utils/constants";
import { defaultSEO } from "@/utils/seo";

export const metadata = (() => {
  const defaultMetadata = defaultSEO({
    title: "/titleraw",
    description: "功能最豐富的 Minecraft 基岩版 /titleraw 線上指令生成器！",
    url: "/titleraw",
  });

  return {
    ...defaultMetadata,
    openGraph: {
      ...defaultMetadata.openGraph,
      images: [
        {
          url: `${domain}/og-images/titleraw.png`,
        },
      ],
    },
  };
})();

export default function RawtextPage() {
  return <RawtextEditor />;
}