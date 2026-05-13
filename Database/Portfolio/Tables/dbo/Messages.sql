CREATE TABLE [dbo].[Messages](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](200) NOT NULL,
	[Email] [nvarchar](255) NOT NULL,
	[Subject] [nvarchar](500) NOT NULL,
	[Content] [nvarchar](max) NOT NULL,
	[SubmittedDate] [datetime2](7) NOT NULL,
	[IsRead] [bit] NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[LastModifiedDate] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Messages] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Messages] ADD  DEFAULT (getutcdate()) FOR [SubmittedDate]
GO

ALTER TABLE [dbo].[Messages] ADD  DEFAULT (getutcdate()) FOR [CreatedDate]
GO

ALTER TABLE [dbo].[Messages] ADD  DEFAULT (getutcdate()) FOR [LastModifiedDate]
GO