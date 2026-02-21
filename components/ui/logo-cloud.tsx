import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";

type Logo = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
    logos: Logo[];
};

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
    return (
        <div
            {...props}
            className={cn(
                "overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]",
                className
            )}
        >
            <InfiniteSlider gap={48} reverse speed={80} speedOnHover={25}>
                {logos.map((logo) => (
                    <img
                        alt={logo.alt}
                        className="pointer-events-none h-5 select-none opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300 dark:brightness-0 dark:invert dark:opacity-50 dark:hover:opacity-80"
                        height={logo.height || "auto"}
                        key={`logo-${logo.alt}`}
                        loading="lazy"
                        src={logo.src}
                        width={logo.width || "auto"}
                    />
                ))}
            </InfiniteSlider>
        </div>
    );
}
