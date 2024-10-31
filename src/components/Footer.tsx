import { renderContent } from "@/app/resources";
import { Flex, IconButton, SmartLink, Text } from "@/once-ui/components"
import { useTranslations } from "next-intl";
// import { person, social } from '@/app/resources'

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    const t = useTranslations();
    const { person, social } = renderContent(t);

    return (
        <Flex
            as="footer"
            position="relative"
            fillWidth padding="8"
            justifyContent="center">
            <Flex
                fillWidth maxWidth="m" paddingY="8" paddingX="16"
                justifyContent="space-between" alignItems="center">
                <Text
                    variant="body-default-s"
                    onBackground="neutral-strong">
                    <Text
                        onBackground="neutral-weak">
                        © {currentYear} /
                    </Text>
                    <Text paddingX="4">
                        CommunIKEA
                    </Text>
                    <Text onBackground="neutral-weak">
                        {/* Usage of this template requires attribution. Please don't remove the link to Once UI. */}
                        / <SmartLink style={{marginLeft: '-0.125rem'}} href="https://once-ui.com/">Once UI</SmartLink>
                    </Text>
                </Text>
                <Flex
                    gap="16">
                </Flex>
            </Flex>
        </Flex>
    )
}