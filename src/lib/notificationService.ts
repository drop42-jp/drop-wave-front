interface NotificationRequest {
  url: string;
  userEmail: string;
  timeToSendEmail: string;
}

export const scheduleNotification = async (
  productId: string,
  userEmail: string,
  dropStartDate: Date
): Promise<{ success: boolean; error?: string }> => {
  try {
    const notificationData: NotificationRequest = {
      url: `${window.location.origin}/product/${productId}`,
      userEmail: userEmail,
      timeToSendEmail: dropStartDate.toISOString(),
    };

    const response = await fetch('http://localhost:8000/notifications/schedule', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notificationData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return { success: true };
  } catch (error) {
    console.error('Error scheduling notification:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to schedule notification' 
    };
  }
};


