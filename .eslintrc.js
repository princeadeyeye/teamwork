module.exports = {
    "root": true,
    "env": {
                "node": true,
                "browser": true,
                "jest": true
    },
    "extends": ["airbnb-base", "airbnb"],
    "rules": {
                "linebreak-style": 0,
                "no-unused-vars": ["error", { "argsIgnorePattern": "(next|match|err|Sequelize|state)" }],
                "prefer-destructuring": 0,
                "import/no-dynamic-require": 0,
                "react/jsx-filename-extension": 0,
                "import/no-extraneous-dependencies": 0,
                "jsx-a11y/label-has-for": {
                    "required": { "some": [ "nesting", "id" ]}
                },
                "jsx-a11y/no-noninteractive-element-interactions": 0,
                "no-class-assign": 0
    }
};