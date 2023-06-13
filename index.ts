/**
 *  Use PrismaClient to connect to the database
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Prisma Client queries
  // const allUsers = await prisma.user.findMany() // 查询语句
  // console.log(allUsers)

  // write data to database
  // create a single user data information
  // await prisma.user.create({
  //   data: {
  //     id: 1,
  //     api_key: 'user1_openai_api_key',
  //     session_token: 'user1_openai_session_token',
  //   }
  // })

  // write data to database
  // create a transaction
  const newUserWithChats = await prisma.user.create({
    data: {
      api_key: 'user1_openai_api_key',
      session_token: 'user1_openai_session_token',
      ChatItems: {
        create: [{
          item_name: 'new chat1',
          modify_date: new Date(),
          ChatMessage: {
            create: [{
              message_content: 'new chat1',
              is_User: true,
            }, {
              message_content: 'new chat2',
              is_User: false,
            }]
          }
        }]
      }
    }
  })
  console.log(newUserWithChats)


}

main().then(async () => {
  await prisma.$disconnect()
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
