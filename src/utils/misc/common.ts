import { colors as ThemeColors } from '@/constants'
import { DeepPartial, Theme } from 'stream-chat-expo'

export const getChatOverlayStyle = (colors: typeof ThemeColors) => {
  const style: DeepPartial<Theme> = {
    colors: {
      primary: colors.primary,
      text: colors.text,
      background: colors.background,
      icon: colors.icon,
      textMuted: colors.textMuted,
    },
    messageList: {
      container: {
        backgroundColor: colors.background,
      },
      contentContainer: {
        backgroundColor: colors.background,
      },
      errorNotification: { backgroundColor: colors.background },
      errorNotificationText: { backgroundColor: colors.background, color: colors.text },
      inlineUnreadIndicator: {
        container: { backgroundColor: colors.background },
        text: { backgroundColor: colors.background, color: colors.text },
      },
      listContainer: {
        backgroundColor: colors.background,
      },
      messageContainer: { backgroundColor: colors.background },
      messageSystem: {
        container: { backgroundColor: colors.background },
        dateText: { color: colors.text, backgroundColor: colors.background },
        line: { backgroundColor: colors.textMuted },
        text: { color: colors.text, backgroundColor: colors.background },
        textContainer: { backgroundColor: colors.background },
      },
      scrollToBottomButton: {
        container: { backgroundColor: colors.background },
        touchable: { backgroundColor: colors.background },
        unreadCountNotificationContainer: { backgroundColor: colors.background },
        unreadCountNotificationText: { backgroundColor: colors.background, color: colors.text },
        wrapper: { backgroundColor: colors.background },
      },
      typingIndicatorContainer: { backgroundColor: colors.background },
    },
    channelListFooterLoadingIndicator: {
      container: { backgroundColor: colors.background },
    },
    channelListHeaderErrorIndicator: {
      container: { backgroundColor: colors.background },
      errorText: { color: colors.error, backgroundColor: colors.background },
    },
    channelListLoadingIndicator: {
      container: { backgroundColor: colors.background },
    },
    channelListMessenger: {
      flatList: { backgroundColor: colors.background },
      flatListContent: { backgroundColor: colors.background },
    },
    channelListSkeleton: {
      background: { backgroundColor: colors.background },
      container: { backgroundColor: colors.background },
      maskFillColor: colors.background,
    },
    channel: {},
    channelPreview: {
      container: {
        backgroundColor: colors.background,
        borderBottomWidth: 1,
        borderBottomColor: colors.primary,
      },
      contentContainer: { backgroundColor: colors.background },
      date: { color: colors.text, backgroundColor: colors.background },
      message: { color: colors.text, backgroundColor: colors.background },
      mutedStatus: {
        iconStyle: { backgroundColor: colors.background },
      },
      row: { backgroundColor: colors.background },
      title: { color: colors.text, backgroundColor: colors.background },
      unreadContainer: { backgroundColor: colors.background },
      unreadText: { color: colors.primary, backgroundColor: colors.background },
    },
  }

  return { style }
}
