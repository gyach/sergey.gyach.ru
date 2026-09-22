import Image from "next/image";
/** Оригинальный векторный логотип из Master_files; внутренние поля сохранены. */
export function BrandLogo() {
    return <Image className="brand" src="/presentations/hrlink/brand/logo.svg" width={448} height={250} alt="HRlink" unoptimized />;
}
