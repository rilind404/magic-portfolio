"use client";

import { AvatarGroup, Flex, Heading, RevealFx, SmartImage, SmartLink, Text } from "@/once-ui/components";
import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6"; // Import both chevrons

interface ProjectCardProps {
    href: string;
    images: string[];
    title: string;
    content: string;
    description: string;
    avatars: { src: string }[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
    href,
    images = [],
    title,
    content,
    description,
    avatars
}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isHoveredRight, setIsHoveredRight] = useState(false); // State for right hover effect
    const [isHoveredLeft, setIsHoveredLeft] = useState(false); // State for left hover effect

    const t = useTranslations();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTransitioning(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleImageClick = (direction: 'left' | 'right') => {
        if(images.length > 1) {
            setIsTransitioning(false);
            const nextIndex = direction === 'right'
                ? (activeIndex + 1) % images.length
                : (activeIndex - 1 + images.length) % images.length;
            handleControlClick(nextIndex);
        }
    };

    const handleControlClick = (index: number) => {
        if (index !== activeIndex) {
            setIsTransitioning(false);
            setTimeout(() => {
                setActiveIndex(index);
                setIsTransitioning(true);
            }, 630);
        }
    };

    return (
        <Flex
            fillWidth gap="m"
            direction="column">
            <Flex position="relative" style={{ width: '100%' }}>
                <RevealFx
                    style={{ width: '100%' }}
                    delay={0.4}
                    trigger={isTransitioning}
                    speed="fast">
                    <SmartImage
                        tabIndex={0}
                        radius="l"
                        alt={title}
                        aspectRatio="16 / 9"
                        src={images[activeIndex]}
                        style={{
                            border: '1px solid var(--neutral-alpha-weak)',
                            ...(images.length > 1 && {
                                cursor: 'pointer',
                            }),
                        }}/>
                </RevealFx>
                {images.length > 1 && (
                    <>
                        <FaChevronLeft
                            size="24px"
                            color="white"
                            onMouseEnter={() => setIsHoveredLeft(true)}
                            onMouseLeave={() => setIsHoveredLeft(false)}
                            onClick={() => handleImageClick('left')}
                            style={{
                                position: 'absolute',
                                left: '16px',
                                top: '50%',
                                transform: isHoveredLeft ? 'translateY(-50%) scale(1.1)' : 'translateY(-50%)',
                                cursor: 'pointer',
                                opacity: isHoveredLeft ? 1 : 0.7,
                                transition: 'opacity 0.2s ease, transform 0.2s ease',
                                borderRadius: '40px',
                                backgroundColor: isHoveredLeft ? 'black' : ''
                            }}
                        />
                        <FaChevronRight
                            size="24px"
                            color="white"
                            onMouseEnter={() => setIsHoveredRight(true)}
                            onMouseLeave={() => setIsHoveredRight(false)}
                            onClick={() => handleImageClick('right')}
                            style={{
                                position: 'absolute',
                                right: '16px',
                                top: '50%',
                                transform: isHoveredRight ? 'translateY(-50%) scale(1.1)' : 'translateY(-50%)',
                                cursor: 'pointer',
                                opacity: isHoveredRight ? 1 : 0.7,
                                transition: 'opacity 0.2s ease, transform 0.2s ease',
                                borderRadius: '40px',
                                backgroundColor: isHoveredRight ? 'black' : ''
                            }}
                        />
                    </>
                )}
            </Flex>
            {images.length > 1 && (
                <Flex
                    gap="4" paddingX="s"
                    fillWidth maxWidth={32}
                    justifyContent="center">
                    {images.map((_, index) => (
                        <Flex
                            key={index}
                            onClick={() => handleControlClick(index)}
                            style={{
                                background: activeIndex === index 
                                    ? 'var(--neutral-on-background-strong)' 
                                    : 'var(--neutral-alpha-medium)',
                                cursor: 'pointer',
                                transition: 'background 0.3s ease',
                            }}
                            fillWidth
                            height="2">
                        </Flex>
                    ))}
                </Flex>
            )}
            <Flex
                mobileDirection="column"
                fillWidth paddingX="l" paddingTop="xs" paddingBottom="m" gap="l">
                {title && (
                    <Flex
                        flex={5}>
                        <Heading
                            as="h2"
                            wrap="balance"
                            variant="display-strong-xs">
                            {title}
                        </Heading>
                    </Flex>
                )}
                {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
                    <Flex
                        flex={7} direction="column"
                        gap="s">
                        {avatars?.length > 0 && (
                            <AvatarGroup
                                avatars={avatars}
                                size="m"
                                reverseOrder/>
                        )}
                        {description?.trim() && (
                            <Text
                                wrap="balance"
                                variant="body-default-s"
                                onBackground="neutral-weak">
                                {description}
                            </Text>
                        )}
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
};
