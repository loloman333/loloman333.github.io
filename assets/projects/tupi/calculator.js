document.addEventListener('DOMContentLoaded', function() {

    // -------------------- Constants --------------------

    const Suits = {
        HEARTS: 'Hearts',
        DIAMONDS: 'Diamonds',
        CLUBS: 'Clubs',
        SPADES: 'Spades',
        ANY: 'Any'
    };

    const Ranks = {
        ANY: 'Any',
        A: 'A',
        TWO: '2',
        THREE: '3',
        FOUR: '4',
        FIVE: '5',
        SIX: '6',
        SEVEN: '7',
        EIGHT: '8',
        NINE: '9',
        TEN: '10',
        J: 'J',
        Q: 'Q',
        K: 'K'
    };

    const RequirementTypes = {
        SAME_RANK: 'sameRank',
        SAME_SUIT: 'sameSuit',
        SAME_COLOR: 'sameColor',
        FLUSH: 'flush',
        STRAIGHT: 'straight',
        ONLY_NUMBERS: 'onlyNumbers',
        ONLY_LETTERS: 'onlyLetters'
    };

    const Colors = {
        ANY: 'Any',
        RED: 'Red',
        BLACK: 'Black'
    };

    var globalRequirements = [];

    // -------------------- Logic related functions --------------------

    function initDeck(deckSize) {
        const deck = [];
        const suits = Object.values(Suits).filter(suit => suit !== Suits.ANY);
        const ranks = Object.values(Ranks).filter(rank => rank !== Ranks.ANY);

        let id = 0;

        suits.forEach(suit => {
            ranks.forEach(rank => {
                deck.push({ suit, rank, id: id++});
            });
        });

        // Add jokers if deck size is greater than 52
        if (deckSize > 52) {
            const jokersCount = deckSize - 52;
            for (let i = 0; i < jokersCount; i++) {
                deck.push({ suit: Suits.ANY, rank: Ranks.ANY, id: id++ });
            }
        }

        return deck;
    }

    function expandNode(node, requirements, finalHandSize, defaultDeck){
        let hand = node.hand;
        let fingerprint = node.fingerprint
        let depth = node.depth;
        let deck = defaultDeck.filter(card => !hand.includes(card)); 
        
        if (depth === finalHandSize) {
            throw new Error('Should not reach this point');
            // return node.probability; TODO: remove this later
        }

        let fingerprintMap = new Map();

        // Iterate over the deck; to find branching factor
        for (let deckIndex = 0; deckIndex < deck.length; deckIndex++) {

            const drawnCard = deck[deckIndex];
            let newFingerprint = fingerprint.map(arr => arr.slice());
            
            // Check how drawn card changes the fingerprint
            for (let [requirementIndex, requirement] of requirements.entries()) {
                let newFingerprintValue = 0;

                switch (requirement.type) {
                    case RequirementTypes.SAME_RANK:
                        if (requirement.rank === Ranks.ANY || requirement.rank === drawnCard.rank || drawnCard.rank === Ranks.ANY) {
                            newFingerprintValue += 1;
                            for (let [handCardIndex, handCard] of hand.entries()) {
                                if (handCard.rank === drawnCard.rank || handCard.rank === Ranks.ANY || drawnCard.rank === Ranks.ANY) {
                                    newFingerprint[requirementIndex][handCardIndex] += 1;
                                    newFingerprintValue += 1;
                                }
                            }
                        }
                        break;
                        
                    default:
                        throw new Error('Invalid requirement type');
                }
                newFingerprint[requirementIndex][depth] = newFingerprintValue;
            }

            // Count different fingerprints
            const fingerprintKey = newFingerprint.map(arr => arr.join(',')).join(';');
            if (fingerprintMap.has(fingerprintKey)){
                let tmpNode = fingerprintMap.get(fingerprintKey);
                tmpNode.count += 1;
                fingerprintMap.set(fingerprintKey, tmpNode);
            } else {
                // TODO: Hope it is fine to just add one instance of a fingerprint to the map
                fingerprintMap.set(fingerprintKey, {
                    fingerprint: newFingerprint,
                    hand: [...hand, drawnCard],
                    depth: depth + 1,
                    count: 1,
                });
            }
        }
        
        // Calculate and sum probabilities
        let sum = 0;
        for (let [_, newNode] of fingerprintMap) {
            console.log(newNode);

            // Check if some requirements are met or failed
            let allMet = true;
            let someFailed = false;
            for (let [requirementIndex, requirement] of requirements.entries()) {
                if (someFailed) {
                    allMet = false;
                    break;
                }

                switch (requirement.type) {
                    case RequirementTypes.SAME_RANK:

                        
                        let maxNumberFingerprint = Math.max(...newNode.fingerprint[requirementIndex]);
                        let maxNumberRequirement = Math.max(...requirement.numbers);
                        let drawsLeft = finalHandSize - newNode.depth;

                        // FAILED: Cannot draw sufficient cards anymore to meet the requirement
                        if ((maxNumberRequirement - maxNumberFingerprint) > drawsLeft) {
                            someFailed = true;
                            break;
                        }
                        
                        // FAILED: Already includes multiples in case of none wanted TODO: check if correct
                        if (requirement.numbers.includes(0) && maxNumberFingerprint > 1) {
                            someFailed = true;
                            break;
                        }

                        // MET: Already includes wanted amounts

                        let fingerprintOccurrences = newNode.fingerprint[requirementIndex].reduce((acc, val) => {
                            acc[val] = (acc[val] || 0) + 1;
                            return acc;
                        }, {});

                        console.log(fingerprintOccurrences);

                        for (let number of requirement.numbers.sort((a, b) => b - a)) {
                            console.log(number);
                            if (fingerprintOccurrences[number] && fingerprintOccurrences[number] >= number) {
                                fingerprintOccurrences[number] -= number;
                                console.log(fingerprintOccurrences);

                                continue;

                            } else {
                                let nextBiggerNumber = Object.keys(fingerprintOccurrences).find(key => parseInt(key) > number);

                                if (nextBiggerNumber && fingerprintOccurrences[nextBiggerNumber] >= number) {
                                    fingerprintOccurrences[nextBiggerNumber] -= number;
                                    console.log(fingerprintOccurrences);

                                    continue;
                                } else {
                                    allMet = false;
                                    break;
                                }
                            }
                        }

                        // TODO: add: MET: Doesn't include any multiples in case of none wanted (number 0 case)

                        break;
                    default:
                        throw new Error('Invalid requirement type');
                }
            }

            if (newNode.depth === finalHandSize && !allMet && !someFailed) {
                someFailed = true;
            }

            if (someFailed) {
                continue; // sum += 0
            } else {
                newNode.probability = node.probability * (newNode.count / (deck.length));
            }
            
            if (allMet) {
                sum += newNode.probability;
                continue;
            }

            sum += expandNode(newNode, requirements, finalHandSize, deck);
        }

        return sum;
    }

    function calculateOdds() {
        const deckSize = parseInt(document.getElementById('deckSize').value);
        let finalHandSize = parseInt(document.getElementById('handSize').value);
        
        deck = initDeck(deckSize);

        let requirements = getRequirements();

        // Merge same requirements      
        for (let i = 0; i < requirements.length; i++) {
            for (let j = i + 1; j < requirements.length; j++) {
                if (requirements[i].type === requirements[j].type &&
                    requirements[i].rank === requirements[j].rank &&
                    requirements[i].suit === requirements[j].suit &&
                    requirements[i].color === requirements[j].color) {
                    requirements[i].numbers.push(requirements[j].numbers[0]);
                    requirements.splice(j, 1);
                    j--;
                }
            }
        }

        // Create root node
        let rootNode = {
            fingerprint: Array(requirements.length).fill([]),
            hand: [],
            depth: 0,
            probability: 1
        }

        // Recursively calculate the odds
        let result = expandNode(rootNode, requirements, finalHandSize, deck);
        
        // Display the results
        result = (result * 100).toFixed(4);
        document.getElementById('result').innerText = 'The odds to draw a hand with the given requirements are: ' + result + '%';
    }

    // -------------------- HTML related functions --------------------

    document.getElementById('calculateButton').addEventListener('click', calculateOdds);
    document.getElementById('addRequirementButton').addEventListener('click', addRequirement);
    document.getElementById('requirementAdderType').addEventListener('change', handleRequirementChange);
    document.getElementById('handSize').addEventListener('change', handleHandSizeChange);

    function handleHandSizeChange() {
        const handSizeValue = document.getElementById('handSize').value;
        document.getElementById('requirementAdderNumber').setAttribute("max", handSizeValue);
    }

    function handleRequirementChange() {
        this.value = this.value ? this.value : document.getElementById('requirementAdderType').value;

        const requirementAdderSuit = document.getElementById('requirementAdderSuit');
        const requirementAdderColor = document.getElementById('requirementAdderColor');
        const requirementAdderRank = document.getElementById('requirementAdderRank');
        const requirementAdderSuitLabel = document.getElementById('requirementAdderSuitLabel');
        const requirementAdderColorLabel = document.getElementById('requirementAdderColorLabel');
        const requirementAdderRankLabel = document.getElementById('requirementAdderRankLabel');

        if (this.value === RequirementTypes.SAME_SUIT) {
            requirementAdderSuit.style.display = 'block';
            requirementAdderSuitLabel.style.display = 'block';
        } else {
            requirementAdderSuit.style.display = 'none';
            requirementAdderSuitLabel.style.display = 'none';
        }

        if (this.value === RequirementTypes.SAME_COLOR) {
            requirementAdderColor.style.display = 'block';
            requirementAdderColorLabel.style.display = 'block';
        } else {
            requirementAdderColor.style.display = 'none';
            requirementAdderColorLabel.style.display = 'none';
        }

        if (this.value === RequirementTypes.SAME_RANK) {
            requirementAdderRank.style.display = 'block';
            requirementAdderRankLabel.style.display = 'block';
        } else {
            requirementAdderRank.style.display = 'none';
            requirementAdderRankLabel.style.display = 'none';
        }
    }

    function addRequirement() {
        const requirementTypeElement = document.getElementById('requirementAdderType');
        const requirementType = requirementTypeElement.value;
        const requirementTypeText = requirementTypeElement.options[requirementTypeElement.selectedIndex].text;
        const requirementNumber = document.getElementById('requirementAdderNumber').value;
        const requirementRank = document.getElementById('requirementAdderRank').value;
        const requirementSuit = document.getElementById('requirementAdderSuit').value;
        const requirementColor = document.getElementById('requirementAdderColor').value;

        const requirementsList = document.getElementById('requirementList');
        const newRequirement = document.createElement('li');

        const requirement = {
            type: requirementType,
            numbers: [requirementNumber],
            rank: requirementType === RequirementTypes.SAME_RANK ? requirementRank : null,
            suit: requirementType === RequirementTypes.SAME_SUIT  ? requirementSuit : null,
            color: requirementType === RequirementTypes.SAME_COLOR  ? requirementColor : null
        };
        globalRequirements.push(requirement);

        let requirementText = `${requirementNumber} cards with ${requirementTypeText}`;
        if (requirementType === RequirementTypes.SAME_RANK && requirementRank !== Ranks.ANY) {
            requirementText += ` of rank ${requirementRank}`;
        }
        if (requirementType === RequirementTypes.SAME_SUIT && requirementSuit !== Suits.ANY) {
            requirementText += ` of suit ${requirementSuit}`;
        }
        if (requirementType === RequirementTypes.SAME_COLOR && requirementColor !== Colors.ANY) {
            requirementText += ` of color ${requirementColor}`;
        }

        const requirementTextElement = document.createElement('span');
        requirementTextElement.className = 'requirement-text';
        requirementTextElement.innerText = requirementText;

        const removeButton = document.createElement('button');
        removeButton.className = 'remove-requirement';
        removeButton.innerText = 'Remove';
        removeButton.addEventListener('click', function() {
            requirementsList.removeChild(newRequirement);
            globalRequirements = globalRequirements.filter(req => req !== requirement);
        });

        newRequirement.appendChild(requirementTextElement);
        newRequirement.appendChild(removeButton);
        requirementsList.appendChild(newRequirement);
    }

    function getRequirements() {
        return globalRequirements;
    }

    handleRequirementChange();
    handleHandSizeChange();
});
