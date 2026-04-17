-- 活动表
CREATE TABLE `aa_activity` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '活动ID',
  `title` VARCHAR(255) NOT NULL COMMENT '活动标题',
  `type` VARCHAR(50) NOT NULL COMMENT '活动类型',
  `budget_per_person` DECIMAL(10,2) NOT NULL COMMENT '人均预算',
  `max_participants` INT NOT NULL COMMENT '最大参与人数',
  `current_participants` INT NOT NULL DEFAULT 0 COMMENT '当前参与人数',
  `start_time` DATETIME NOT NULL COMMENT '开始时间',
  `location` VARCHAR(255) NOT NULL COMMENT '活动地点',
  `description` TEXT NOT NULL COMMENT '活动描述',
  `image` VARCHAR(500) NOT NULL COMMENT '活动图片',
  `creator_id` BIGINT NOT NULL COMMENT '创建者ID',
  `icebreaker_question` VARCHAR(500) COMMENT '破冰问题',
  `status` VARCHAR(20) NOT NULL DEFAULT 'PENDING' COMMENT '活动状态：PENDING(待开始)、ONGOING(进行中)、COMPLETED(已完成)、CANCELLED(已取消)',
  `created_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  INDEX `idx_creator_id` (`creator_id`),
  INDEX `idx_status` (`status`),
  INDEX `idx_start_time` (`start_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='活动表';

-- 活动参与者表
CREATE TABLE `aa_activity_participant` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '参与者ID',
  `activity_id` BIGINT NOT NULL COMMENT '活动ID',
  `user_id` BIGINT NOT NULL COMMENT '用户ID',
  `answer` TEXT COMMENT '破冰问题答案',
  `deposit_status` VARCHAR(20) NOT NULL DEFAULT 'PENDING' COMMENT '保证金状态：PENDING(待支付)、PAID(已支付)、REFUNDED(已退还)、FORFEITED(已没收)',
  `deposit_amount` DECIMAL(10,2) NOT NULL DEFAULT 20.00 COMMENT '保证金金额',
  `status` VARCHAR(20) NOT NULL DEFAULT 'JOINED' COMMENT '参与状态：JOINED(已加入)、ATTENDED(已参加)、ABSENT(缺席)',
  `created_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uk_activity_user` (`activity_id`, `user_id`),
  INDEX `idx_activity_id` (`activity_id`),
  INDEX `idx_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='活动参与者表';

-- 据点表
CREATE TABLE `aa_hub` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '据点ID',
  `name` VARCHAR(255) NOT NULL COMMENT '据点名称',
  `description` TEXT NOT NULL COMMENT '据点描述',
  `members` INT NOT NULL DEFAULT 0 COMMENT '成员数量',
  `location` VARCHAR(255) NOT NULL COMMENT '地点',
  `image` VARCHAR(500) NOT NULL COMMENT '据点图片',
  `creator_id` BIGINT NOT NULL COMMENT '创建者ID',
  `created_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  INDEX `idx_creator_id` (`creator_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='据点表';

-- 据点标签表
CREATE TABLE `aa_hub_tag` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '标签ID',
  `hub_id` BIGINT NOT NULL COMMENT '据点ID',
  `tag` VARCHAR(50) NOT NULL COMMENT '标签名称',
  PRIMARY KEY (`id`),
  INDEX `idx_hub_id` (`hub_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='据点标签表';

-- 据点成员表
CREATE TABLE `aa_hub_member` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '成员ID',
  `hub_id` BIGINT NOT NULL COMMENT '据点ID',
  `user_id` BIGINT NOT NULL COMMENT '用户ID',
  `join_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '加入时间',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uk_hub_user` (`hub_id`, `user_id`),
  INDEX `idx_hub_id` (`hub_id`),
  INDEX `idx_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='据点成员表';

-- 账单表
CREATE TABLE `aa_bill` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '账单ID',
  `activity_id` BIGINT NOT NULL COMMENT '活动ID',
  `total_amount` DECIMAL(10,2) NOT NULL COMMENT '总金额',
  `creator_id` BIGINT NOT NULL COMMENT '创建者ID',
  `status` VARCHAR(20) NOT NULL DEFAULT 'PENDING' COMMENT '账单状态：PENDING(待确认)、CONFIRMED(已确认)、PAID(已支付)',
  `created_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  INDEX `idx_activity_id` (`activity_id`),
  INDEX `idx_creator_id` (`creator_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='账单表';

-- 账单明细
CREATE TABLE `aa_bill_item` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '明细ID',
  `bill_id` BIGINT NOT NULL COMMENT '账单ID',
  `user_id` BIGINT NOT NULL COMMENT '用户ID',
  `amount` DECIMAL(10,2) NOT NULL COMMENT '金额',
  `status` VARCHAR(20) NOT NULL DEFAULT 'PENDING' COMMENT '支付状态：PENDING(待支付)、PAID(已支付)',
  `created_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  INDEX `idx_bill_id` (`bill_id`),
  INDEX `idx_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='账单明细表';

-- 评价表
CREATE TABLE `aa_rating` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '评价ID',
  `activity_id` BIGINT NOT NULL COMMENT '活动ID',
  `rater_id` BIGINT NOT NULL COMMENT '评价者ID',
  `rated_id` BIGINT NOT NULL COMMENT '被评价者ID',
  `score` INT NOT NULL COMMENT '评分(1-5)',
  `comment` TEXT COMMENT '评价内容',
  `tags` VARCHAR(500) COMMENT '评价标签，逗号分隔',
  `created_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uk_activity_rater_rated` (`activity_id`, `rater_id`, `rated_id`),
  INDEX `idx_activity_id` (`activity_id`),
  INDEX `idx_rater_id` (`rater_id`),
  INDEX `idx_rated_id` (`rated_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='评价表';

-- 聊天群表
CREATE TABLE `aa_chat_group` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '群聊ID',
  `activity_id` BIGINT NOT NULL COMMENT '活动ID',
  `name` VARCHAR(255) NOT NULL COMMENT '群聊名称',
  `status` VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' COMMENT '群聊状态：ACTIVE(活跃)、INACTIVE(已解散)',
  `created_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uk_activity` (`activity_id`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='聊天群表';

-- 聊天消息表
CREATE TABLE `aa_chat_message` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '消息ID',
  `group_id` BIGINT NOT NULL COMMENT '群聊ID',
  `user_id` BIGINT NOT NULL COMMENT '发送者ID',
  `content` TEXT NOT NULL COMMENT '消息内容',
  `created_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '发送时间',
  PRIMARY KEY (`id`),
  INDEX `idx_group_id` (`group_id`),
  INDEX `idx_user_id` (`user_id`),
  INDEX `idx_created_time` (`created_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='聊天消息表';

-- 用户信用表
CREATE TABLE `aa_user_credit` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '信用ID',
  `user_id` BIGINT NOT NULL COMMENT '用户ID',
  `credit_score` INT NOT NULL DEFAULT 100 COMMENT '信用分数',
  `created_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uk_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户信用表';

-- 用户信用记录
CREATE TABLE `aa_user_credit_record` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '记录ID',
  `user_id` BIGINT NOT NULL COMMENT '用户ID',
  `type` VARCHAR(20) NOT NULL COMMENT '记录类型：INCREASE(增加)、DECREASE(减少)',
  `score` INT NOT NULL COMMENT '分数变化',
  `reason` VARCHAR(500) NOT NULL COMMENT '原因',
  `created_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  INDEX `idx_user_id` (`user_id`),
  INDEX `idx_type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户信用记录表';