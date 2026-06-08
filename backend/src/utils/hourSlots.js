const generateHourSlots = (startTime, endTime) => {
  const slots = [];

  let start = parseInt(startTime.split(":")[0]);
  let end = parseInt(endTime.split(":")[0]);

  for (let hour = start; hour < end; hour++) {
    const formatted = hour.toString().padStart(2, "0") + ":00";
    slots.push(formatted);
  }

  return slots;
};

module.exports = generateHourSlots;