CREATE TABLE route (
    rout_id      NUMBER GENERATED ALWAYS AS IDENTITY,
    origin       VARCHAR2(50) NOT NULL,
    destination  VARCHAR2(50) NOT NULL,
    distance_km  NUMBER(6),
    CONSTRAINT route_pk PRIMARY KEY (rout_id)
);

CREATE TABLE vehicle (
    vehicle_id        NUMBER GENERATED ALWAYS AS IDENTITY,
    registration_num  VARCHAR2(20) NOT NULL,
    vehicle_type      VARCHAR2(10) NOT NULL,
    manu_year         NUMBER(4),
    model             VARCHAR2(30),
    status            VARCHAR2(20) DEFAULT 'Active',
    capacity          NUMBER(3) NOT NULL,
    fuel_type         VARCHAR2(20),
    ac_type           VARCHAR2(20),
    route_type        VARCHAR2(30),
    CONSTRAINT vehicle_pk      PRIMARY KEY (vehicle_id),
    CONSTRAINT vehicle_reg_uk  UNIQUE (registration_num),
    CONSTRAINT vehicle_type_ck CHECK (vehicle_type IN ('VAN', 'BUS'))
);

CREATE TABLE passenger (
    passenger_id       NUMBER GENERATED ALWAYS AS IDENTITY,
    first_name         VARCHAR2(50) NOT NULL,
    last_name          VARCHAR2(50) NOT NULL,
    email              VARCHAR2(100) NOT NULL,
    password           VARCHAR2(100) NOT NULL,
    registration_date  DATE DEFAULT SYSDATE,
    CONSTRAINT passenger_pk       PRIMARY KEY (passenger_id),
    CONSTRAINT passenger_email_uk UNIQUE (email)
);

CREATE TABLE passenger_contact (
    passenger_id    NUMBER NOT NULL,
    contact_number  VARCHAR2(30),
    CONSTRAINT passenger_contact_pk PRIMARY KEY (passenger_id, contact_number),
    CONSTRAINT passenger_contact_fk FOREIGN KEY (passenger_id) REFERENCES passenger (passenger_id)
);

CREATE TABLE employee (
    employee_id  NUMBER GENERATED ALWAYS AS IDENTITY,
    first_name   VARCHAR2(50) NOT NULL,
    last_name    VARCHAR2(50) NOT NULL,
    emp_role     VARCHAR2(10) NOT NULL,
    status       VARCHAR2(20) DEFAULT 'Active',
    hire_date    DATE DEFAULT SYSDATE,
    email        VARCHAR2(100),
    password     VARCHAR2(100),
    CONSTRAINT employee_pk       PRIMARY KEY (employee_id),
    CONSTRAINT employee_email_uk UNIQUE (email),
    CONSTRAINT employee_role_ck  CHECK (emp_role IN ('ADMIN', 'DRIVER', 'MECHANIC')),
    CONSTRAINT employee_status_ck CHECK (status IN ('Active', 'Inactive'))
);

CREATE TABLE driver (
    employee_id  NUMBER,
    license_num  VARCHAR2(20) NOT NULL,
    CONSTRAINT driver_pk         PRIMARY KEY (employee_id),
    CONSTRAINT driver_license_uk UNIQUE (license_num),
    CONSTRAINT driver_employee_fk FOREIGN KEY (employee_id) REFERENCES employee (employee_id)
);

CREATE TABLE mechanic (
    employee_id     NUMBER,
    expertise_area  VARCHAR2(100),
    CONSTRAINT mechanic_pk          PRIMARY KEY (employee_id),
    CONSTRAINT mechanic_employee_fk FOREIGN KEY (employee_id) REFERENCES employee (employee_id)
);

CREATE TABLE employee_contact (
    employee_id     NUMBER NOT NULL,
    contact_number  VARCHAR2(30),
    CONSTRAINT employee_contact_pk PRIMARY KEY (employee_id, contact_number),
    CONSTRAINT employee_contact_fk FOREIGN KEY (employee_id) REFERENCES employee (employee_id)
);

CREATE TABLE trip (
    trip_id           NUMBER GENERATED ALWAYS AS IDENTITY,
    base_price        NUMBER(8,2) NOT NULL,
    depa_datetime     TIMESTAMP NOT NULL,
    arrival_datetime  TIMESTAMP,
    status            VARCHAR2(20) DEFAULT 'Scheduled',
    route_id          NUMBER NOT NULL,
    vehicle_id        NUMBER NOT NULL,
    driver_id         NUMBER NOT NULL,
    CONSTRAINT trip_pk         PRIMARY KEY (trip_id),
    CONSTRAINT trip_status_ck  CHECK (status IN ('Scheduled', 'Completed', 'Cancelled')),
    CONSTRAINT trip_time_ck    CHECK (arrival_datetime IS NULL OR arrival_datetime > depa_datetime),
    CONSTRAINT trip_route_fk   FOREIGN KEY (route_id)   REFERENCES route (rout_id),
    CONSTRAINT trip_vehicle_fk FOREIGN KEY (vehicle_id) REFERENCES vehicle (vehicle_id),
    CONSTRAINT trip_driver_fk  FOREIGN KEY (driver_id)  REFERENCES driver (employee_id)
);

CREATE TABLE ticket (
    ticket_id     NUMBER GENERATED ALWAYS AS IDENTITY,
    price         NUMBER(8,2) NOT NULL,
    seat_num      VARCHAR2(5) NOT NULL,
    booking_date  DATE DEFAULT SYSDATE,
    trip_id       NUMBER NOT NULL,
    passenger_id  NUMBER NOT NULL,
    CONSTRAINT ticket_pk           PRIMARY KEY (ticket_id),
    CONSTRAINT ticket_seat_uk      UNIQUE (trip_id, seat_num),
    CONSTRAINT ticket_trip_fk      FOREIGN KEY (trip_id)      REFERENCES trip (trip_id),
    CONSTRAINT ticket_passenger_fk FOREIGN KEY (passenger_id) REFERENCES passenger (passenger_id)
);

CREATE TABLE payment (
    payment_id  NUMBER GENERATED ALWAYS AS IDENTITY,
    amount      NUMBER(8,2) NOT NULL,
    pay_type    VARCHAR2(20) NOT NULL,
    pay_date    DATE DEFAULT SYSDATE,
    status      VARCHAR2(20) DEFAULT 'Paid',
    ticket_id   NUMBER NOT NULL,
    CONSTRAINT payment_pk        PRIMARY KEY (payment_id),
    CONSTRAINT payment_ticket_uk UNIQUE (ticket_id),
    CONSTRAINT payment_type_ck   CHECK (pay_type IN ('Cash', 'Card')),
    CONSTRAINT payment_status_ck CHECK (status IN ('Paid', 'Pending', 'Refunded')),
    CONSTRAINT payment_ticket_fk FOREIGN KEY (ticket_id) REFERENCES ticket (ticket_id)
);

CREATE TABLE feedback (
    feedback_id   NUMBER GENERATED ALWAYS AS IDENTITY,
    submit_date   DATE DEFAULT SYSDATE,
    rating        NUMBER(1) NOT NULL,
    passenger_id  NUMBER NOT NULL,
    trip_id       NUMBER NOT NULL,
    CONSTRAINT feedback_pk           PRIMARY KEY (feedback_id),
    CONSTRAINT feedback_rating_ck    CHECK (rating BETWEEN 1 AND 5),
    CONSTRAINT feedback_passenger_fk FOREIGN KEY (passenger_id) REFERENCES passenger (passenger_id),
    CONSTRAINT feedback_trip_fk      FOREIGN KEY (trip_id)      REFERENCES trip (trip_id)
);

CREATE TABLE maintenance (
    main_id        NUMBER GENERATED ALWAYS AS IDENTITY,
    cost           NUMBER(10,2),
    repaired_date  DATE DEFAULT SYSDATE,
    service_type   VARCHAR2(50),
    employee_id    NUMBER NOT NULL,
    vehicle_id     NUMBER NOT NULL,
    CONSTRAINT maintenance_pk          PRIMARY KEY (main_id),
    CONSTRAINT maintenance_mechanic_fk FOREIGN KEY (employee_id) REFERENCES mechanic (employee_id),
    CONSTRAINT maintenance_vehicle_fk  FOREIGN KEY (vehicle_id)  REFERENCES vehicle (vehicle_id)
);


-- ROUTE
INSERT INTO route (origin, destination, distance_km) VALUES ('Colombo', 'Kandy', 115);
INSERT INTO route (origin, destination, distance_km) VALUES ('Colombo', 'Galle', 116);
INSERT INTO route (origin, destination, distance_km) VALUES ('Kandy', 'Nuwara Eliya', 78);
INSERT INTO route (origin, destination, distance_km) VALUES ('Colombo', 'Jaffna', 396);
INSERT INTO route (origin, destination, distance_km) VALUES ('Galle', 'Matara', 45);

-- VEHICLE
INSERT INTO vehicle (registration_num, vehicle_type, manu_year, model, status, capacity, fuel_type, ac_type, route_type) VALUES ('ND-4521', 'BUS', 2020, 'Ashok Leyland', 'Active', 40, NULL, 'AC', 'Intercity');
INSERT INTO vehicle (registration_num, vehicle_type, manu_year, model, status, capacity, fuel_type, ac_type, route_type) VALUES ('NC-1122', 'BUS', 2026, 'TATA', 'Maintenance', 52, NULL, 'Non-AC', 'Express');
INSERT INTO vehicle (registration_num, vehicle_type, manu_year, model, status, capacity, fuel_type, ac_type, route_type) VALUES ('NB-7788', 'BUS', 2021, 'Lanka Ashok Leyland', 'Active', 44, NULL, 'AC', 'Intercity');
INSERT INTO vehicle (registration_num, vehicle_type, manu_year, model, status, capacity, fuel_type, ac_type, route_type) VALUES ('NA-3456', 'BUS', 2015, 'Isuzu', 'Active', 36, NULL, 'AC', 'City');
INSERT INTO vehicle (registration_num, vehicle_type, manu_year, model, status, capacity, fuel_type, ac_type, route_type) VALUES ('GH-8890', 'VAN', 2016, 'Toyota HiAce', 'Active', 14, 'Diesel', NULL, NULL);
INSERT INTO vehicle (registration_num, vehicle_type, manu_year, model, status, capacity, fuel_type, ac_type, route_type) VALUES ('LP-5544', 'VAN', 2019, 'Nissan Caravan', 'Active', 12, 'Petrol', NULL, NULL);
INSERT INTO vehicle (registration_num, vehicle_type, manu_year, model, status, capacity, fuel_type, ac_type, route_type) VALUES ('CD-2201', 'VAN', 2022, 'Toyota KDH', 'Active', 14, 'Diesel', NULL, NULL);
INSERT INTO vehicle (registration_num, vehicle_type, manu_year, model, status, capacity, fuel_type, ac_type, route_type) VALUES ('OX-9012', 'VAN', 2014, 'Toyota HiAce', 'Inactive', 14, 'Diesel', NULL, NULL);

-- PASSENGER
INSERT INTO passenger (first_name, last_name, email, password, registration_date) VALUES ('Nimal', 'Perera', 'nimal@gmail.com', 'nimal123', TO_DATE('2026-08-15', 'YYYY-MM-DD'));
INSERT INTO passenger (first_name, last_name, email, password, registration_date) VALUES ('Kamal', 'Silva', 'kamal@gmail.com', 'kamal123', TO_DATE('2026-08-15', 'YYYY-MM-DD'));
INSERT INTO passenger (first_name, last_name, email, password, registration_date) VALUES ('Saman', 'virahinha', 'saman@gmail.com', 'saman123', TO_DATE('2026-08-15', 'YYYY-MM-DD'));
INSERT INTO passenger (first_name, last_name, email, password, registration_date) VALUES ('nimali', 'perera', 'nimali@gmail.com', 'nimali123', TO_DATE('2026-08-21', 'YYYY-MM-DD'));
INSERT INTO passenger (first_name, last_name, email, password, registration_date) VALUES ('Ayesha', 'Fernando', 'ayesha@gmail.com', 'ayesha123', TO_DATE('2026-08-15', 'YYYY-MM-DD'));
INSERT INTO passenger (first_name, last_name, email, password, registration_date) VALUES ('Ruwan', 'Jayasinha', 'ruwan@gmail.com', 'ruwan123', TO_DATE('2026-08-15', 'YYYY-MM-DD'));

INSERT INTO passenger_contact (passenger_id, contact_number) VALUES (1, '0771234567');
INSERT INTO passenger_contact (passenger_id, contact_number) VALUES (1, '0112345678');
INSERT INTO passenger_contact (passenger_id, contact_number) VALUES (2, '0719876543');
INSERT INTO passenger_contact (passenger_id, contact_number) VALUES (3, '0765554433');
INSERT INTO passenger_contact (passenger_id, contact_number) VALUES (4, '0701112233');
INSERT INTO passenger_contact (passenger_id, contact_number) VALUES (5, '0778889900');
INSERT INTO passenger_contact (passenger_id, contact_number) VALUES (5, '0114445566');
INSERT INTO passenger_contact (passenger_id, contact_number) VALUES (6, '0752223344');

-- EMPLOYEE
INSERT INTO employee (first_name, last_name, emp_role, status, hire_date, email, password) VALUES ('Anura', 'Perera', 'ADMIN', 'Active', TO_DATE('2024-01-10', 'YYYY-MM-DD'), 'admin@gmail.com', 'admin123');
INSERT INTO employee (first_name, last_name, emp_role, status, hire_date, email, password) VALUES ('Nuwan', 'Silva', 'DRIVER', 'Active', TO_DATE('2024-02-15', 'YYYY-MM-DD'), 'nuwan@gmail.com', 'nuwan123');
INSERT INTO employee (first_name, last_name, emp_role, status, hire_date, email, password) VALUES ('Kamal', 'Perera', 'DRIVER', 'Active', TO_DATE('2024-03-01', 'YYYY-MM-DD'), 'kamalp@gmail.com', 'kamal123');
INSERT INTO employee (first_name, last_name, emp_role, status, hire_date, email, password) VALUES ('Chaminda', 'Rathnayake', 'DRIVER', 'Active', TO_DATE('2024-06-12', 'YYYY-MM-DD'), 'chaminda@gmail.com', 'chamidna123');
INSERT INTO employee (first_name, last_name, emp_role, status, hire_date, email, password) VALUES ('Prasad', 'Gunawardena', 'DRIVER', 'Active', TO_DATE('2025-01-20', 'YYYY-MM-DD'), 'prasad@gmail.com', 'prasad123');
INSERT INTO employee (first_name, last_name, emp_role, status, hire_date, email, password) VALUES ('Saman', 'Kumara', 'MECHANIC', 'Active', TO_DATE('2024-05-20', 'YYYY-MM-DD'), 'saman@gmail.com', 'saman123');
INSERT INTO employee (first_name, last_name, emp_role, status, hire_date, email, password) VALUES ('Lasantha', 'Wickrama', 'MECHANIC', 'Active', TO_DATE('2025-03-05', 'YYYY-MM-DD'), 'lasantha@gmail.com', 'mech123');

INSERT INTO driver (employee_id, license_num) VALUES (2, 'B1234567');
INSERT INTO driver (employee_id, license_num) VALUES (3, 'D2345678');
INSERT INTO driver (employee_id, license_num) VALUES (4, 'B3456789');
INSERT INTO driver (employee_id, license_num) VALUES (5, 'A4567890');

INSERT INTO mechanic (employee_id, expertise_area) VALUES (6, 'Engine Repair');
INSERT INTO mechanic (employee_id, expertise_area) VALUES (7, 'Brakes and Electrical');

INSERT INTO employee_contact (employee_id, contact_number) VALUES (1, '0771234500');
INSERT INTO employee_contact (employee_id, contact_number) VALUES (2, '0772223344');
INSERT INTO employee_contact (employee_id, contact_number) VALUES (3, '0773334455');
INSERT INTO employee_contact (employee_id, contact_number) VALUES (4, '0774445566');
INSERT INTO employee_contact (employee_id, contact_number) VALUES (5, '0775556677');
INSERT INTO employee_contact (employee_id, contact_number) VALUES (6, '0776667788');
INSERT INTO employee_contact (employee_id, contact_number) VALUES (6, '0112223344');
INSERT INTO employee_contact (employee_id, contact_number) VALUES (7, '0777778899');

-- TRIP
INSERT INTO trip (base_price, depa_datetime, arrival_datetime, status, route_id, vehicle_id, driver_id) VALUES (450, TO_DATE('2026-09-05 08:00', 'YYYY-MM-DD HH24:MI'), TO_DATE('2026-09-05 11:30', 'YYYY-MM-DD HH24:MI'), 'Completed', 1, 1, 2);
INSERT INTO trip (base_price, depa_datetime, arrival_datetime, status, route_id, vehicle_id, driver_id) VALUES (450, TO_DATE('2026-09-12 14:00', 'YYYY-MM-DD HH24:MI'), TO_DATE('2026-09-12 17:30', 'YYYY-MM-DD HH24:MI'), 'Completed', 1, 3, 3);
INSERT INTO trip (base_price, depa_datetime, arrival_datetime, status, route_id, vehicle_id, driver_id) VALUES (600, TO_DATE('2026-09-10 09:30', 'YYYY-MM-DD HH24:MI'), TO_DATE('2026-09-10 12:30', 'YYYY-MM-DD HH24:MI'), 'Completed', 2, 5, 4);
INSERT INTO trip (base_price, depa_datetime, arrival_datetime, status, route_id, vehicle_id, driver_id) VALUES (600, TO_DATE('2026-09-20 07:00', 'YYYY-MM-DD HH24:MI'), TO_DATE('2026-09-20 10:00', 'YYYY-MM-DD HH24:MI'), 'Completed', 2, 6, 5);
INSERT INTO trip (base_price, depa_datetime, arrival_datetime, status, route_id, vehicle_id, driver_id) VALUES (350, TO_DATE('2026-09-25 10:00', 'YYYY-MM-DD HH24:MI'), TO_DATE('2026-09-25 12:30', 'YYYY-MM-DD HH24:MI'), 'Completed', 3, 4, 2);
INSERT INTO trip (base_price, depa_datetime, arrival_datetime, status, route_id, vehicle_id, driver_id) VALUES (1800, TO_DATE('2026-09-28 21:00', 'YYYY-MM-DD HH24:MI'), TO_DATE('2026-09-29 05:00', 'YYYY-MM-DD HH24:MI'), 'Completed', 4, 3, 3);
INSERT INTO trip (base_price, depa_datetime, arrival_datetime, status, route_id, vehicle_id, driver_id) VALUES (250, TO_DATE('2026-09-30 15:00', 'YYYY-MM-DD HH24:MI'), TO_DATE('2026-09-30 16:15', 'YYYY-MM-DD HH24:MI'), 'Completed', 5, 7, 4);
INSERT INTO trip (base_price, depa_datetime, arrival_datetime, status, route_id, vehicle_id, driver_id) VALUES (450, TO_DATE('2026-10-05 08:00', 'YYYY-MM-DD HH24:MI'), NULL, 'Cancelled', 1, 1, 2);
INSERT INTO trip (base_price, depa_datetime, arrival_datetime, status, route_id, vehicle_id, driver_id) VALUES (450, TO_DATE('2026-10-14 08:00', 'YYYY-MM-DD HH24:MI'), TO_DATE('2026-10-14 11:30', 'YYYY-MM-DD HH24:MI'), 'Scheduled', 1, 1, 2);
INSERT INTO trip (base_price, depa_datetime, arrival_datetime, status, route_id, vehicle_id, driver_id) VALUES (600, TO_DATE('2026-10-15 09:30', 'YYYY-MM-DD HH24:MI'), TO_DATE('2026-10-15 12:30', 'YYYY-MM-DD HH24:MI'), 'Scheduled', 2, 5, 4);
INSERT INTO trip (base_price, depa_datetime, arrival_datetime, status, route_id, vehicle_id, driver_id) VALUES (1800, TO_DATE('2026-10-18 21:00', 'YYYY-MM-DD HH24:MI'), TO_DATE('2026-10-19 05:00', 'YYYY-MM-DD HH24:MI'), 'Scheduled', 4, 3, 3);
INSERT INTO trip (base_price, depa_datetime, arrival_datetime, status, route_id, vehicle_id, driver_id) VALUES (350, TO_DATE('2026-10-16 10:00', 'YYYY-MM-DD HH24:MI'), TO_DATE('2026-10-16 12:30', 'YYYY-MM-DD HH24:MI'), 'Scheduled', 3, 4, 5);

-- TICKET
INSERT INTO ticket (price, seat_num, booking_date, trip_id, passenger_id) VALUES (450, '1A', TO_DATE('2026-09-01', 'YYYY-MM-DD'), 1, 1);
INSERT INTO ticket (price, seat_num, booking_date, trip_id, passenger_id) VALUES (450, '1B', TO_DATE('2026-09-01', 'YYYY-MM-DD'), 1, 2);
INSERT INTO ticket (price, seat_num, booking_date, trip_id, passenger_id) VALUES (450, '2A', TO_DATE('2026-09-02', 'YYYY-MM-DD'), 1, 3);
INSERT INTO ticket (price, seat_num, booking_date, trip_id, passenger_id) VALUES (450, '3C', TO_DATE('2026-09-08', 'YYYY-MM-DD'), 2, 4);
INSERT INTO ticket (price, seat_num, booking_date, trip_id, passenger_id) VALUES (450, '3D', TO_DATE('2026-09-09', 'YYYY-MM-DD'), 2, 1);
INSERT INTO ticket (price, seat_num, booking_date, trip_id, passenger_id) VALUES (600, '1A', TO_DATE('2026-09-07', 'YYYY-MM-DD'), 3, 5);
INSERT INTO ticket (price, seat_num, booking_date, trip_id, passenger_id) VALUES (600, '1B', TO_DATE('2026-09-07', 'YYYY-MM-DD'), 3, 6);
INSERT INTO ticket (price, seat_num, booking_date, trip_id, passenger_id) VALUES (600, '2A', TO_DATE('2026-09-08', 'YYYY-MM-DD'), 3, 2);
INSERT INTO ticket (price, seat_num, booking_date, trip_id, passenger_id) VALUES (600, '2B', TO_DATE('2026-09-15', 'YYYY-MM-DD'), 4, 3);
INSERT INTO ticket (price, seat_num, booking_date, trip_id, passenger_id) VALUES (600, '2C', TO_DATE('2026-09-16', 'YYYY-MM-DD'), 4, 4);
INSERT INTO ticket (price, seat_num, booking_date, trip_id, passenger_id) VALUES (350, '1A', TO_DATE('2026-09-20', 'YYYY-MM-DD'), 5, 1);
INSERT INTO ticket (price, seat_num, booking_date, trip_id, passenger_id) VALUES (350, '4D', TO_DATE('2026-09-21', 'YYYY-MM-DD'), 5, 5);
INSERT INTO ticket (price, seat_num, booking_date, trip_id, passenger_id) VALUES (1800, '5A', TO_DATE('2026-09-22', 'YYYY-MM-DD'), 6, 2);

-- PAYMENT
INSERT INTO payment (amount, pay_type, pay_date, status, ticket_id)
SELECT price, 'Card', booking_date, 'Paid', ticket_id FROM ticket WHERE ticket_id NOT IN (8, 10, 13);
UPDATE payment SET pay_type = 'Cash' WHERE MOD(ticket_id, 3) = 0;
UPDATE payment SET status = 'Refunded' WHERE ticket_id = 6;

-- FEEDBACK
INSERT INTO feedback (rating, passenger_id, trip_id) VALUES (5, 1, 1);
INSERT INTO feedback (rating, passenger_id, trip_id) VALUES (4, 2, 1);
INSERT INTO feedback (rating, passenger_id, trip_id) VALUES (4, 3, 1);
INSERT INTO feedback (rating, passenger_id, trip_id) VALUES (3, 4, 2);
INSERT INTO feedback (rating, passenger_id, trip_id) VALUES (5, 1, 2);
INSERT INTO feedback (rating, passenger_id, trip_id) VALUES (5, 5, 3);
INSERT INTO feedback (rating, passenger_id, trip_id) VALUES (4, 6, 3);
INSERT INTO feedback (rating, passenger_id, trip_id) VALUES (2, 3, 4);
INSERT INTO feedback (rating, passenger_id, trip_id) VALUES (4, 4, 4);
INSERT INTO feedback (rating, passenger_id, trip_id) VALUES (5, 1, 5);
INSERT INTO feedback (rating, passenger_id, trip_id) VALUES (3, 5, 5);
INSERT INTO feedback (rating, passenger_id, trip_id) VALUES (5, 2, 6);
INSERT INTO feedback (rating, passenger_id, trip_id) VALUES (5, 4, 7);

-- MAINTENANCE
INSERT INTO maintenance (cost, repaired_date, service_type, employee_id, vehicle_id) VALUES (8500, TO_DATE('2026-02-01', 'YYYY-MM-DD'), 'Engine Oil Change', 6, 1);
INSERT INTO maintenance (cost, repaired_date, service_type, employee_id, vehicle_id) VALUES (12000, TO_DATE('2026-08-10', 'YYYY-MM-DD'), 'Brake Service', 7, 1);
INSERT INTO maintenance (cost, repaired_date, service_type, employee_id, vehicle_id) VALUES (15500, TO_DATE('2026-03-12', 'YYYY-MM-DD'), 'Engine Repair', 6, 2);
INSERT INTO maintenance (cost, repaired_date, service_type, employee_id, vehicle_id) VALUES (9000, TO_DATE('2026-06-20', 'YYYY-MM-DD'), 'Tyre Replacement', 7, 3);
INSERT INTO maintenance (cost, repaired_date, service_type, employee_id, vehicle_id) VALUES (7500, TO_DATE('2026-01-25', 'YYYY-MM-DD'), 'Engine Oil Change', 6, 4);
INSERT INTO maintenance (cost, repaired_date, service_type, employee_id, vehicle_id) VALUES (6000, TO_DATE('2026-09-01', 'YYYY-MM-DD'), 'Oil Change', 7, 5);
INSERT INTO maintenance (cost, repaired_date, service_type, employee_id, vehicle_id) VALUES (11000, TO_DATE('2026-04-05', 'YYYY-MM-DD'), 'Brake Inspection', 7, 6);
INSERT INTO maintenance (cost, repaired_date, service_type, employee_id, vehicle_id) VALUES (9500, TO_DATE('2026-07-15', 'YYYY-MM-DD'), 'AC Service', 6, 7);
INSERT INTO maintenance (cost, repaired_date, service_type, employee_id, vehicle_id) VALUES (14000, TO_DATE('2025-11-30', 'YYYY-MM-DD'), 'Gearbox Repair', 6, 8);

COMMIT;

DELETE FROM feedback WHERE trip_id = 7;
COMMIT;

INSERT INTO ticket (price, seat_num, booking_date, trip_id, passenger_id) VALUES (450, '1A', TO_DATE('2026-10-08', 'YYYY-MM-DD'), 9, 1);
INSERT INTO ticket (price, seat_num, booking_date, trip_id, passenger_id) VALUES (450, '1B', TO_DATE('2026-10-08', 'YYYY-MM-DD'), 9, 2);
INSERT INTO ticket (price, seat_num, booking_date, trip_id, passenger_id) VALUES (600, '3A', TO_DATE('2026-10-09', 'YYYY-MM-DD'), 10, 4);
INSERT INTO ticket (price, seat_num, booking_date, trip_id, passenger_id) VALUES (1800, '1A', TO_DATE('2026-10-10', 'YYYY-MM-DD'), 11, 6);


INSERT INTO payment (amount, pay_type, pay_date, status, ticket_id)
SELECT price, 'Card', booking_date, 'Paid', ticket_id FROM ticket WHERE trip_id = 9;
COMMIT;

---------------------------------------------------------------------------------------------------------------------
--most use routes
SET SERVEROUTPUT ON;

CREATE OR REPLACE PROCEDURE report_frequent_routes
IS
    CURSOR route_cursor IS
        SELECT r.origin, r.destination, COUNT(t.ticket_id) AS bookings
        FROM route r
        JOIN trip tr ON tr.route_id = r.rout_id
        JOIN ticket t ON t.trip_id = tr.trip_id
        GROUP BY r.origin, r.destination
        ORDER BY bookings DESC;

    x route_cursor%ROWTYPE;

BEGIN
    DBMS_OUTPUT.PUT_LINE('Route  -  Bookings');

    OPEN route_cursor;

    LOOP
        FETCH route_cursor INTO x;
        EXIT WHEN route_cursor%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE(x.origin || ' to ' || x.destination || '  -  ' || x.bookings);
    END LOOP;

    CLOSE route_cursor;
END;



EXECUTE report_frequent_routes;

---------------------------------------------------------------------------------------------------------------------------
--revenue in a period
SET SERVEROUTPUT ON;

CREATE OR REPLACE FUNCTION get_revenue (p_start IN DATE, p_end IN DATE)
RETURN NUMBER
IS
    total NUMBER;
BEGIN
    -- "< p_end + 1" includes every payment made on the end date
    SELECT NVL(SUM(amount), 0) INTO total
    FROM payment
    WHERE status = 'Paid'
    AND pay_date >= p_start
    AND pay_date < p_end + 1;

    RETURN total;
END;


CREATE OR REPLACE PROCEDURE report_revenue (p_start IN DATE, p_end IN DATE)
IS
    CURSOR pay_cursor IS
        SELECT pay_type, COUNT(*) AS payments, SUM(amount) AS total
        FROM payment
        WHERE status = 'Paid'
        AND pay_date >= p_start
        AND pay_date < p_end + 1
        GROUP BY pay_type;

    x pay_cursor%ROWTYPE;

BEGIN
    DBMS_OUTPUT.PUT_LINE('Payment type  -  Payments  -  Amount');

    OPEN pay_cursor;

    LOOP
        FETCH pay_cursor INTO x;
        EXIT WHEN pay_cursor%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE(x.pay_type || '  -  ' || x.payments || '  -  ' || x.total);
    END LOOP;

    CLOSE pay_cursor;

    DBMS_OUTPUT.PUT_LINE('Total revenue : ' || get_revenue(p_start, p_end));
END;




BEGIN
    report_revenue(TO_DATE('2026-09-01', 'YYYY-MM-DD'), TO_DATE('2026-09-30', 'YYYY-MM-DD'));
END;

--------------------------------------------------------------------------------------------------------------
--passenger travel history
SET SERVEROUTPUT ON;

CREATE OR REPLACE PROCEDURE report_passenger_history (p_id IN NUMBER)
IS
    p_name VARCHAR2(100);

    CURSOR history_cursor IS
        SELECT t.ticket_id, r.origin, r.destination, tr.depa_datetime, t.seat_num, t.price, tr.status
        FROM ticket t
        JOIN trip tr ON tr.trip_id = t.trip_id
        JOIN route r ON r.rout_id = tr.route_id
        WHERE t.passenger_id = p_id
        ORDER BY tr.depa_datetime;

    x history_cursor%ROWTYPE;

BEGIN
    SELECT first_name || ' ' || last_name INTO p_name
    FROM passenger
    WHERE passenger_id = p_id;

    DBMS_OUTPUT.PUT_LINE('Travel history of ' || p_name);

    OPEN history_cursor;

    LOOP
        FETCH history_cursor INTO x;
        EXIT WHEN history_cursor%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE('Ticket ' || x.ticket_id || '  ' || x.origin || ' to ' || x.destination ||
                             '  ' || TO_CHAR(x.depa_datetime, 'YYYY-MM-DD') || '  seat ' || x.seat_num ||
                             '  Rs.' || x.price || '  ' || x.status);
    END LOOP;

    CLOSE history_cursor;

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Error : No passenger with id ' || p_id);
END;




EXECUTE report_passenger_history(1);
EXECUTE report_passenger_history(99);

----------------------------------------------------------------------------------------------------------------------
--vehicles due for maintenance

SET SERVEROUTPUT ON;

CREATE OR REPLACE PROCEDURE report_maintenance_due
IS
    CURSOR due_cursor IS
        SELECT v.registration_num, v.vehicle_type, MAX(m.repaired_date) AS last_service
        FROM vehicle v
        JOIN maintenance m ON m.vehicle_id = v.vehicle_id
        GROUP BY v.registration_num, v.vehicle_type
        HAVING MAX(m.repaired_date) < SYSDATE - 180
        ORDER BY last_service;

    x due_cursor%ROWTYPE;

BEGIN
    DBMS_OUTPUT.PUT_LINE('Vehicles not serviced for more than 180 days');

    OPEN due_cursor;

    LOOP
        FETCH due_cursor INTO x;
        EXIT WHEN due_cursor%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE(x.registration_num || ' (' || x.vehicle_type || ')  last service : ' ||
                             TO_CHAR(x.last_service, 'YYYY-MM-DD'));
    END LOOP;

    CLOSE due_cursor;
END;



EXECUTE report_maintenance_due;

-----------------------------------------------------------------------------------------------------------
--top-rated drivers

SET SERVEROUTPUT ON;

CREATE OR REPLACE PROCEDURE report_top_drivers
IS
    CURSOR driver_cursor IS
        SELECT e.first_name, e.last_name, ROUND(AVG(f.rating), 2) AS avg_rating, COUNT(f.feedback_id) AS reviews
        FROM feedback f
        JOIN trip tr ON tr.trip_id = f.trip_id
        JOIN employee e ON e.employee_id = tr.driver_id
        GROUP BY e.employee_id, e.first_name, e.last_name
        ORDER BY avg_rating DESC;

    x driver_cursor%ROWTYPE;

BEGIN
    DBMS_OUTPUT.PUT_LINE('Driver  -  Average rating  -  Reviews');

    OPEN driver_cursor;

    LOOP
        FETCH driver_cursor INTO x;
        EXIT WHEN driver_cursor%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE(x.first_name || ' ' || x.last_name || '  -  ' || x.avg_rating || '  -  ' || x.reviews);
    END LOOP;

    CLOSE driver_cursor;
END;



EXECUTE report_top_drivers;

-------------------------------------------------------------------------------------------------------------------------
--number of tickets already booked for the trip

CREATE OR REPLACE FUNCTION seats_left (p_trip_id IN NUMBER)
RETURN NUMBER
IS
    v_capacity vehicle.capacity%TYPE;
    v_booked NUMBER;
BEGIN
    SELECT v.capacity INTO v_capacity
    FROM trip tr
    JOIN vehicle v ON v.vehicle_id = tr.vehicle_id
    WHERE tr.trip_id = p_trip_id;

    SELECT COUNT(*) INTO v_booked
    FROM ticket
    WHERE trip_id = p_trip_id;

    RETURN v_capacity - v_booked;

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN -1;
END;




SELECT trip_id, seats_left(trip_id) AS seats_left FROM trip;

-------------------------------------------------------------------------------------------------------------------------
--book a ticket

SET SERVEROUTPUT ON;

CREATE OR REPLACE PROCEDURE book_ticket (p_trip_id IN NUMBER, p_passenger_id IN NUMBER, p_seat IN VARCHAR2)
IS
    v_price trip.base_price%TYPE;
BEGIN
    SELECT base_price INTO v_price
    FROM trip
    WHERE trip_id = p_trip_id;

    IF seats_left(p_trip_id) <= 0 THEN
        DBMS_OUTPUT.PUT_LINE('Error : No seats left on this trip');
    ELSE
        INSERT INTO ticket (price, seat_num, trip_id, passenger_id)
        VALUES (v_price, p_seat, p_trip_id, p_passenger_id);

        DBMS_OUTPUT.PUT_LINE('Ticket booked, seat ' || p_seat);
    END IF;

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Error : Trip not found');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error : ' || SQLERRM);
END;

----------------------------------------------------------------------------------------------------------------------
--payment must match the ticket price

CREATE OR REPLACE TRIGGER payment_amount_trg
BEFORE INSERT ON payment
FOR EACH ROW
DECLARE
    v_price ticket.price%TYPE;
BEGIN
    SELECT price INTO v_price
    FROM ticket
    WHERE ticket_id = :NEW.ticket_id;

    IF :NEW.amount <> v_price THEN
        RAISE_APPLICATION_ERROR(-20002, 'Payment amount does not match the ticket price');
    END IF;
END;

------------------------------------------------------------------------------------------------------------------------
--tickets can only be booked for Scheduled trips

CREATE OR REPLACE TRIGGER ticket_status_trg
BEFORE INSERT ON ticket
FOR EACH ROW
DECLARE
    v_status trip.status%TYPE;
BEGIN
    SELECT status INTO v_status
    FROM trip
    WHERE trip_id = :NEW.trip_id;

    IF v_status <> 'Scheduled' THEN
        RAISE_APPLICATION_ERROR(-20001, 'Tickets can only be booked for Scheduled trips');
    END IF;
END;

--------------------------------------------------------------------------------------------------------------------------
SET SERVEROUTPUT ON;

BEGIN
    book_ticket(9, 4, '2A');     
    book_ticket(9, 5, '2A');     
    book_ticket(8, 5, '1A');     
    book_ticket(99, 5, '1A');    
END;


INSERT INTO payment (amount, pay_type, ticket_id) VALUES (100, 'Cash', 8);   
ROLLBACK;

SELECT * FROM passenger;

SELECT * FROM passenger_contact;



