const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.MESSAGE_CONTENT,
        Intents.FLAGS.MESSAGE_REACTIONS
    ],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

client.once('ready', () => {
    console.log('Бот готов!');
});

client.on('messageCreate', message => {
    if (message.content === '!команды') {
        const embed = new MessageEmbed()
            .setTitle('Выберите команду:')
            .setDescription('Нажмите на одну из кнопок ниже, чтобы выбрать команду:')
            .setColor('#0099ff')
            .addFields(
                { name: 'RED', value: 'Выберите команду RED:', inline: true },
                { name: 'BLU', value: 'Выберите команду BLU:', inline: true },
            )
            .setTimestamp()
            .setFooter('Выберите команду');

        message.channel.send({ embeds: [embed], components: createButtons() });
    }
});

function createButtons() {
    const row1 = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('RED_scout')
                .setLabel('Scout')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('RED_pocket_scout')
                .setLabel('Pocket Scout')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('RED_arcade_soldier')
                .setLabel('Arcade Soldier')
                .setStyle('PRIMARY')
        );

    const row2 = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('RED_pocket_soldier')
                .setLabel('Pocket Soldier')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('RED_demoman')
                .setLabel('Demoman')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('RED_medic')
                .setLabel('Medic')
                .setStyle('PRIMARY')
        );

    return [row1, row2];
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    const { customId } = interaction;

    if (customId.startsWith('RED')) {
        const position = customId.split('_')[1]; // Получаем выбранную позицию

        // Действия при выборе позиции в команде RED
        await interaction.reply(`Вы выбрали команду RED и позицию: ${position}`);
    } else if (customId.startsWith('BLU')) {
        const position = customId.split('_')[1]; // Получаем выбранную позицию

        // Действия при выборе позиции в команде BLU
        await interaction.reply(`Вы выбрали команду BLU и позицию: ${position}`);
    }
});

client.login('MTIzOTE5MTg5MDI2NDMyNjIxNA.GA2eCq.gQ4JfRxslTARN7xexRof5nSVbNt_cw6PkvgORg');
