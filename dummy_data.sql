
USE dev;

-- 식당 더미 계정 2개
INSERT INTO restaurant (name, user_id, password) VALUES
('한식당', 'rest01', 'pass01'),
('일식당', 'rest02', 'pass02');

-- 고객 더미 계정 3개
INSERT INTO customer (name, user_id, password) VALUES
('홍길동', 'cust01', 'pass01'),
('김영희', 'cust02', 'pass02'),
('이철수', 'cust03', 'pass03');

-- 메뉴 더미 데이터 (식당 1번과 2번에 각각)
INSERT INTO menu (name, price, category, description, restaurant_id) VALUES
('김치찌개', 9000, '한식', '매콤한 김치찌개', 1),
('된장찌개', 8500, '한식', '구수한 된장찌개', 1),
('초밥세트', 15000, '일식', '신선한 초밥세트', 2),
('우동', 7000, '일식', '따뜻한 우동 한 그릇', 2);

-- 예약 더미 (고객 1이 식당 1에 예약)
INSERT INTO reservation (date, start_time, end_time, phone_number, headcount, customer_id, restaurant_id)
VALUES ('2025-07-06', '18:00:00', '19:00:00', '010-1234-5678', 2, 1, 1);

-- 예약에 포함된 메뉴 (김치찌개와 된장찌개)
INSERT INTO reservation_menu (reservation_id, menu_id) VALUES
(1, 1),
(1, 2);