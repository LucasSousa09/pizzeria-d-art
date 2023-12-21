import Image from "next/image";

type SliderSlideProps = {
    bannerImg: string,
    text: string,
    author: string
}

export function SliderSlide({ bannerImg, text, author }: SliderSlideProps){
    return (
        <>
            <div className='absolute top-0 left-0 right-0 bottom-0 bg-overlay flex flex-col justify-center items-center gap-8'>
                <strong className="text-background text-6xl font-medium">{text}</strong>
                <span className="text-background text-4xl font-medium">Rodrigues, Lucas</span>
            </div>
            <Image className="max-h-[600px] h-[600px] object-cover" src={bannerImg} alt="" height={600} width={1920}/>
        </>
    )
}