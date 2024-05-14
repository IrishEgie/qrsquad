import serial

ser = serial.Serial('COM14', 9600)

print("Starting", ser.is_open)
while True:
  try:
    print("Scanned")
    _id = ser.read(16).decode()
    print(ser.read(16))
    if "b0e4-0b-85-83-34" == _id:
      print("True")
    # ser.close()
  except KeyboardInterrupt:
    print("Interrupted")
    ser.close()
    break
