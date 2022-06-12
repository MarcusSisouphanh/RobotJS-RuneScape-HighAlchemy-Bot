/* High alchemy bot
   Assumes window application is in 1920x1080 
*/

// Implement the robotjs library
let robot = require('robotjs');

function main()
{
    console.log("Starting...")
    sleep(4000);

    openInventory();
    sleep(1000);

    let hasRunes = checkRunes();
    let hasItems = checkItems();

    // Open the magic book when we have nature runes and items in correct slots
    if(hasRunes && hasItems)
    {
        openMagicBook();
        sleep(1000);
        // Infinite loop when we have items in correct slots.
        while (true)
        {
            selectHighAlchemy();
            // Cast the high alchemy spell when runes and items are in the correct slots in inventory
            if (checkInventory())
            {   
                castHighAlchemy();
                continue;
            }
            else
            {
                break;
            }
        }
    }

    // End of program when runes or items are empty
    console.log("");
    console.log("Ending program.");
}

function checkRunes()
{
    runePixel_X = 1704;
    runePixel_Y = 760;

    let runePixel = robot.getPixelColor(runePixel_X, runePixel_Y)

    // Check the color of the inventory so we know that the nature rune is in the first slot
    if (runePixel == "3e3529" || runePixel != "0a7a0c")
    {
        console.log("");
        console.log("Nature runes are not in the first slot in your inventory.")
        return false;
    }
    else
    {
        console.log("");
        console.log("Nature runes are in first slot in inventory.")
        return true;
    }
}

function checkItems()
{
    itemPixel_X = 1739;
    itemPixel_Y = 763;

    let itemPixel = robot.getPixelColor(itemPixel_X,  itemPixel_Y)

     // Check the color of the inventory so we know that the item is in the third slot
    if (itemPixel == "3e3529")
    {
        console.log("Items are not in the second slot in your inventory.")
        return false;
    }
    else
    {
        console.log("Items are in second slot in inventory.")
        return true;
    }
}

function openInventory() 
{
    const minSleep = 300, maxSleep = 500;
    const minInventory_X = 1760, maxInventory_X = 1770;
    const minInventory_Y = 718, maxInventory_Y = 724;

    let inventoryX = getRandomInt(minInventory_X, maxInventory_X);
    let inventoryY = getRandomInt(minInventory_Y, maxInventory_Y);

    /* Open the inventory with specified random generated pixel coordinates
       and randomly generate specified sleep interval */
    console.log("");
    console.log("Moving to pixel coordinate: " + inventoryX + ", " + inventoryY);
    console.log("Opening inventory...");
    robot.moveMouse(inventoryX, inventoryY);
    let sleepInterval = getRandomInt(minSleep, maxSleep);
    sleep(sleepInterval);
    robot.mouseClick();
    sleepInterval = getRandomInt(minSleep, maxSleep);
    sleep(sleepInterval);
}

function openMagicBook() 
{
    const minSleep = 300, maxSleep = 500;
    const minMagicBook_X = 1860, maxMagicBook_X = 1870;
    const minMagicBook_Y = 720, maxMagicBook_Y = 725;

    let magicBook_X = getRandomInt(minMagicBook_X, maxMagicBook_X);
    let magicBook_Y = getRandomInt(minMagicBook_Y, maxMagicBook_Y);

    /* Open the magic book with specified random generated pixel coordinates
       and randomly generate specified sleep interval */
    console.log("");
    console.log("Moving to pixel coordinate: " + magicBook_X + ", " + magicBook_Y);
    console.log("Opening magic book...");
    robot.moveMouse(magicBook_X, magicBook_Y);
    let sleepInterval = getRandomInt(minSleep, maxSleep);
    sleep(sleepInterval);
    robot.mouseClick();
    sleepInterval = getRandomInt(minSleep, maxSleep);
    sleep(sleepInterval);

}
function selectHighAlchemy()
{   
    const minSleep = 300, maxSleep = 500;

    const minSpell_X = 1832, maxSpell_X = 1838;
    const minSpell_Y = 862, maxSpell_Y = 866;

    let spell_X = getRandomInt(minSpell_X, maxSpell_X);
    let spell_Y = getRandomInt(minSpell_Y, maxSpell_Y);

    /* Select the high alchemy spell with specified random generated pixel coordinates
       and randomly generate specified sleep interval */
    console.log("");
    console.log("Moving to pixel coordinate: " + spell_X + ", " + spell_Y);
    console.log("Selecting high alchemy...");
    robot.moveMouse(spell_X, spell_Y);
    sleepInterval = getRandomInt(minSleep, maxSleep);
    sleep(sleepInterval);
    robot.mouseClick();
    sleepInterval = getRandomInt(minSleep, maxSleep);
    sleep(sleepInterval);
}

function checkInventory()
{
    const minSleep = 300, maxSleep = 500;
    const minItem_X = 1739, maxItem_X = 1745;
    const minItem_Y = 763, maxItem_Y = 769;

    let item_X = getRandomInt(minItem_X, maxItem_X);
    let item_Y = getRandomInt(minItem_Y, maxItem_Y);

    // Moves to the specified random generated pixel coordinate where the item is
    console.log("");
    console.log("Moving to pixel coordinate: " + item_X + ", " + item_Y);
    robot.moveMouse(item_X, item_Y);
    sleepInterval = getRandomInt(minSleep, maxSleep);
    sleep(sleepInterval);

    console.log("Checking Inventory...");

    // Checks if the item is in inventory
    if (checkRunes() && checkItems())
    {
        return true;
    }
    else
    {
        return false;
    }
}

function castHighAlchemy()
{
    const minHighAlchemy = 3000, maxHighAlchemy = 3500;

    console.log("");
    console.log("Casting high alchemy...")

    // Cast the high alchemy spell.
    robot.mouseClick();
    sleepInterval = getRandomInt(minHighAlchemy, maxHighAlchemy);
    sleep(sleepInterval);
 }

function getRandomInt(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function sleep(ms) 
{
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

main();

