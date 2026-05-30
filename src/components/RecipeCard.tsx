import React from 'react';

interface RecipeCardProps {
    tag: string;
    title: string;
    desc: string;
    rating: string;
    reviews: string;
    image?: string;
    bgColor?: string;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
                                                          tag,
                                                          title,
                                                          desc,
                                                          rating,
                                                          reviews,
                                                          image,
                                                          bgColor = '#faf6ef',
                                                      }) => {
    return (
        <article
            className="group flex flex-col overflow-hidden border border-charcoal bg-white transition-all duration-200"
            style={{}}
            onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '6px 6px 0px #1a1a1a';
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translate(0, 0)';
            }}
        >
            <div className="relative h-56 overflow-hidden">
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="h-full w-full" style={{ backgroundColor: bgColor }} />
                )}
            </div>

            <div className="flex flex-1 flex-col p-5">
                <span className="text-xs font-semibold uppercase tracking-wide text-charcoal">
                    <span className="text-mandarin">{tag.split(' ')[0]}</span>{' '}
                    {tag.split(' ').slice(1).join(' ')}
                </span>

                <h3 className="mt-2 text-lg font-bold text-space-black">
                    {title}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal">
                    {desc}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-faded-cream pt-4">
                    <div className="flex items-center gap-1.5">
                        <span className="text-mandarin">★</span>
                        <span className="text-sm font-bold text-space-black">{rating}</span>
                        <span className="text-sm text-charcoal">({reviews})</span>
                    </div>

                    <a
                        href="#"
                        className="border border-charcoal px-4 py-1.5 text-xs font-semibold text-charcoal transition-colors hover:bg-charcoal hover:text-white"
                    >
                        View Recipe →
                    </a>
                </div>
            </div>
        </article>
    );
};