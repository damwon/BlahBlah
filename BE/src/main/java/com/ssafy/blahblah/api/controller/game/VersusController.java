package com.ssafy.blahblah.api.controller.game;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.*;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/versus")
public class VersusController {

    @GetMapping("/{category}")
    public ResponseEntity getVersusTopic(@ApiIgnore @PathVariable int category){
        List<String> topics = getCategoryArray(category);
        Collections.shuffle(topics);
        String topic = topics.get(0);
        return new ResponseEntity<>(topic,HttpStatus.OK);
    }

    private List<String> getCategoryArray(int category) {
        List<String> topics;
        if(category == 1) { // 음식(food)
            topics = Arrays.asList("Eat only sweet potatoes every day VS Eat only potatoes every day",
                    "Eat only meat for a year VS  Eat only noodles for a year",
                    "Eat hot food in summer VS Eat cold food in winter",
                    "Curry-flavored poop VS Poop-flavored curry",
                    "Only eat meat forever VS Only eat vegetables forever",
                    "Not drink soda forever VS Not drink soda forever",
                    "Pizza VS Chicken",
                    "Coke without soda VS Pizza without cheese",
                    "Soft peaches VS Hard peaches",
                    "Whiskey VS Tequila",
                    "Chocolate VS Cookies",
                    "Pudding VS Cake",
                    "Meat VS Seafood",
                    "Red wine VS White wine",
                    "Ketchup VS Mayonnaise",
                    "Tomato base pasta VS Cream base pasta");
        } else if (category == 2) { // 연인(lover)
            topics = Arrays.asList("A lover who's only good at sports VS A lover who's only good at studying",
                    "Lover who drinks VS Lover who smokes",
                    "Dying a day before your lover dies VS Dying a day later your lover dies",
                    "Meeting your ideal mate and having no friends VS Being single forever but having a lot of friends",
                    "Worst enemy with 10 billion dollars VS Ideal mate with 10 billion dollar debt",
                    "Lover being able to hear my thoughts VS Show all my text messages to the lover",
                    "Text 100 times a day VS Text once a month",
                    "Lover who always nags  VS Lover who always complain",
                    "Marry someone you like VS Marry someone who likes you",
                    "A lover who farts whenever burps VS A lover who burps whenever farts",
                    "Going out with your ex-lover's best friend VS going out with your best friend's ex-lover",
                    "3 minutes VS 3 hours",
                    "Playboy VS Mama's Boy",
                    "A well-paid spouse VS A good-natured spouse",
                    "Loud burping lover VS Loud farting lover");
        } else if (category == 3) { // 고통(pain)
            topics = Arrays.asList("Can not laugh when you want to laugh VS Can not cry when you want to cry",
                    "Mobile phone battery 10% but able to use data VS Mobile phone battery 100% but no data and Wi-Fi ",
                    "Hour of boring flight VS 10 hours of fun flight",
                    "Can't wash hair for a week VS Can't brush your teeth for a week",
                    "Get lost in the desert VS Get lost in the North Pole",
                    "Tired no matter how much you sleep VS Hungry no matter how much you eat",
                    "Headache VS Stomachache",
                    "Air conditioner in Antarctica VS Heater in the desert",
                    "Holding back hunger VS Chewing your tongue while eating something delicious",
                    "Starve for two days VS Stay up for two nights",
                    "Everyone in the world recognizes you VS Everyone in the world ignores you",
                    "Only listen to pop songs forever VS Only listen to ballads forever",
                    "Live in a country with only summer VS Live in a country with only winter",
                    "Live without cell phone for 1 year VS Live without friends for 1 year",
                    "Only able to make phone calls forever VS Only abel to text forever",
                    "Live forever as 10 years old VS Live forever as 70 years old",
                    "Live without reading books VS Live without listening to music",
                    "When you have a company interview, the person next to you is Elite VS the person next to you is your ex-lover",
                    "Have toothache forever VS Have headache forever");
        } else if (category == 4) { // 좋아요(like)
            topics = Arrays.asList("100,000 dollars if you don't use your cell phone for a year VS Use cell phone without getting paid",
                    "Live with your ideal face VS Get 100,000 dollars",
                    "Travel to the future VS Travel back to the past",
                    "Born again without having to choose who you are VS Live the present life",
                    "Eyesight of 200 VS IQ of 200",
                    "Unemployed but get 1,500 dollars a month VS Work and get 3,000 dollars a month",
                    "Expert in one field VS Little bit talented in many different fields",
                    "Cat person VS Dog person",
                    "Never gain weight no matter how much you eat VS Never need to sleep ",
                    "Poor 20s VS Rich 70s",
                    "Knowing is power VS Ignorance is bliss",
                    "Born with the face you want VS Born with the body you want",
                    "Staying home all week VS Going out all week",
                    "Fishing VS Hiking",
                    "Get $1million by 50% chance VS Get $50,000 by 100% chance",
                    "Extreme vision VS Extreme hearing",
                    "Hilarious but dislikeable person VS Nice but boring person",
                    "A boring and sincere person VS A shallow and fun person",
                    "A boss who works well but has a bad temper VS A boss who is really nice but can't work",
                    "Romance movies VS Horror movies",
                    "Tourist attractions VS Vacation spots",
                    "Teleportation VS Time Travel");
        } else {
            topics = Arrays.asList("Invalid category");
        }
        return topics;
    }
}
