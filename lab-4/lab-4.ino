const int p1 = A6;
const int p2 = A5;

void setup() {
  // put your setup code here, to run once:
}

void loop() {
  // put your main code here, to run repeatedly:
  Serial.print(analogRead(p1));
  Serial.print(",");
  Serial.println(analogRead(p2));
}
