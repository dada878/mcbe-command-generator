import RawtextEditor from "@/components/pages/rawtextEditor";
import { domain } from "@/utils/constants";
import { defaultSEO } from "@/utils/seo";

export const metadata = (() => {
  const defaultMetadata = defaultSEO({
    title: "Rawtext",
    description: "功能最豐富的 Minecraft 基岩版 Rawtext 線上指令生成器！",
    url: "/rawtext",
  });

  return {
    ...defaultMetadata,
    openGraph: {
      ...defaultMetadata.openGraph,
      images: [
        {
          url: `${domain}/og-images/rawtext.png`,
        },
      ],
    },
  };
})();

export default function RawtextPage() {
  return (
    <RawtextEditor />
  )
}