export const getEventStatus = (eventStartTime: string, eventEndTime: string): 'LIVE' | 'UPCOMING' | 'COMPLETED' => {
const now = new Date();
  const startTime = new Date(eventStartTime);
  const endTime = new Date(eventEndTime);
  if (now >= startTime && now <= endTime){
    return 'LIVE';
  }
  else if (now < startTime){
    return 'UPCOMING';
  }
  else {
    return 'COMPLETED';
  }
}